import secrets
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Annotated, Any, Dict

from pydantic import (
    AnyUrl,
    BeforeValidator,
    computed_field,
)

def parse_cors(v: Any) -> list[str] | str:
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",")]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file="../.env",
        env_ignore_empty=True,
        extra="ignore",
        arbitrary_types_allowed=True
    )
    PROJECT_NAME: str
    FRONTEND_HOST: str = "http://localhost:5173"

    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)

    BACKEND_CORS_ORIGINS: Annotated[
        list[AnyUrl] | str, BeforeValidator(parse_cors)
    ] = []

    @computed_field  # type: ignore[prop-decorator]
    @property
    def all_cors_origins(self) -> list[str]:
        return [str(origin).rstrip("/") for origin in self.BACKEND_CORS_ORIGINS] + [
            self.FRONTEND_HOST
        ]

    POSTGRES_HOST: str
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str = ""
    POSTGRES_DB: str = ""

    # konfiguracja SMTP
    SMTP_TLS: bool = True
    SMTP_SSL: bool = False
    SMTP_PORT: int = 587
    SMTP_HOST: str | None = None
    SMTP_USER: str | None = None
    SMTP_PASSWORD: str | None = None

    @computed_field
    @property
    def SMTP_config(self) -> Dict[str, Any]:
        """
        Zwraca konfigurację SMTP jako słownik.
        """
        return {
            "host": self.SMTP_HOST,
            "port": self.SMTP_PORT,
            "user": self.SMTP_USER,
            "password": self.SMTP_PASSWORD,
            "tls": self.SMTP_TLS,
            "ssl": self.SMTP_SSL,
        }


settings = Settings()

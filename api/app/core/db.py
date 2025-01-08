from sqlmodel import SQLModel, create_engine, Session
from app.core.config import settings
from app.core.initial_data import load_initial_data

DATABASE_URL = (
    f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}"
    f"@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
)

engine = create_engine(DATABASE_URL, echo=True)  # `echo=True` loguje zapytania SQL do konsoli

def init_db():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        load_initial_data(session)

def get_session():
    with Session(engine) as session:
        yield session

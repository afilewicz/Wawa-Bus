from datetime import datetime
from typing import Optional, List

from sqlalchemy import Column, Integer
from sqlalchemy.dialects.postgresql import ARRAY
from sqlmodel import SQLModel, Field, Relationship


class LocationTime(SQLModel):
    time: datetime

class MailBody(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)
    to: List[str] = Field(default=[])
    subject: str
    body: str

class NotificationRequest(SQLModel):
    line: str = Field(..., description="Numer linii autobusowej")
    stop: str = Field(..., description="Nazwa pętli/przystanku")
    email: str = Field(..., description="Adres e-mail użytkownika")
    time: str = Field(..., description="Godzina powiadomienia")
    user_id: int = Field(..., description="Id użytkownika")


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str
    hashed_password: str
    active_notifications_ids: Optional[List[int]] = Field(default=[], sa_column=Column(ARRAY(Integer)))

    notifications: List["Notification"] = Relationship(back_populates="user", cascade_delete=True)

class UserCreate(SQLModel):
    email: str
    password: str


class Notification(SQLModel, table=True):
    id: str = Field(primary_key=True)
    line: str
    stop: str
    email: str
    time: datetime
    user_id: int = Field(foreign_key="user.id")

    user: "User" = Relationship(back_populates="notifications")
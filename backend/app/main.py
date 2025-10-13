from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine, get_db
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import ARRAY, JSONB
from pydantic import BaseModel
from typing import List, Dict, Optional

# SQLAlchemy model (database)
class ProfileDB(Base):
    __tablename__ = "profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    theme = Column(String, default="light")
    profilePicture = Column(String, nullable=True)
    instruments = Column(ARRAY(String))
    genres = Column(ARRAY(String))
    artists = Column(JSONB)

# Pydantic models (API)
class ProfileCreate(BaseModel):
    name: str
    email: str
    theme: Optional[str] = "light"
    profilePicture: Optional[str] = None
    instruments: Optional[List[str]] = []
    genres: Optional[List[str]] = []
    artists: Optional[List[Dict]] = []

class ProfileResponse(BaseModel):
    id: int
    name: str
    email: str
    theme: str
    profilePicture: Optional[str]
    instruments: List[str]
    genres: List[str]
    artists: List[Dict]
    
    class Config:
        orm_mode = True  # Allows conversion from SQLAlchemy to Pydantic

# Creating all tables if they don't already exist
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods including OPTIONS, POST, GET, etc.
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI backend!"}

@app.get("/profile")
def get_profile():
    # cursor.execute some database insertion
    return {"message": "Profile saved", "user_id": "replace with fetched user id"}

@app.post("/profile", response_model = ProfileResponse)
def save_profile(profile_data: ProfileCreate, db: Session = Depends(get_db)):
    db_profile = ProfileDB(**profile_data.dict())
    db.add(db_profile)   
    db.commit()
    
    return db_profile
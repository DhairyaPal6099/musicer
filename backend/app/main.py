from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine, get_db, SessionLocal
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import ARRAY, JSONB

class ProfileDB(Base):
    __tablename__ = "profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    theme = Column(String, default="light")
    instruments = Column(ARRAY(String))
    genres = Column(ARRAY(String))
    artists = Column(JSONB)

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

@app.post("/profile")
def save_profile(db: Session = Depends(get_db)):
    test_profile = ProfileDB(
        name="Dhairya User",
        email="RAAIL.com",
        theme="midnight", 
        instruments=["guitar", "piano"],
        genres=["rock", "jazz"],
        artists=[{"id": "1", "name": "Test Artist"}]
    )
    
    db.add(test_profile)
    print(f"✅ Profile added to session: {test_profile.email}")
    
    db.commit()
    print("✅ Session committed to database!")
    
    # Refresh to get the auto-generated ID
    db.refresh(test_profile)
    print(f"✅ Profile saved with ID: {test_profile.id}")
    
    return {"message": "Data saved successfully"}
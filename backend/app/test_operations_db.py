import sys
import os
import json

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal, Base, engine
from sqlalchemy import Column, String, Integer, Text
# No need for text import here since we're not using raw SQL in this test

# Same ProfileDB model as we'll use in main.py
class ProfileDB(Base):
    __tablename__ = "profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    theme = Column(String, default="light")
    instruments = Column(Text)
    genres = Column(Text)
    artists = Column(Text)

def test_operations():
    try:
        # Create tables
        Base.metadata.create_all(bind=engine)
        print("✅ Tables created successfully!")
        
        # Test inserting data
        with SessionLocal() as session:
            # Create a test profile
            test_profile = ProfileDB(
                name="Test User",
                email="test@example.com",
                theme="dark",
                instruments=json.dumps(["guitar", "piano"]),
                genres=json.dumps(["rock", "jazz"]),
                artists=json.dumps([{"id": "1", "name": "Test Artist"}])
            )
            
            session.add(test_profile)
            session.commit()
            print("✅ Data inserted successfully!")
            
            # Test reading data
            saved_profile = session.query(ProfileDB).filter_by(email="test@example.com").first()
            print(f"✅ Data retrieved - Name: {saved_profile.name}, Theme: {saved_profile.theme}")
            
            # Test JSON parsing
            instruments = json.loads(saved_profile.instruments)
            genres = json.loads(saved_profile.genres)
            artists = json.loads(saved_profile.artists)
            print(f"✅ Instruments: {instruments}")
            print(f"✅ Genres: {genres}") 
            print(f"✅ Artists: {artists}")
            
            # Test updating data
            saved_profile.theme = "light"
            session.commit()
            print("✅ Data updated successfully!")
            
            # Test deleting data
            session.delete(saved_profile)
            session.commit()
            print("✅ Data deleted successfully!")
            
        return True
        
    except Exception as e:
        print(f"❌ Database operations failed: {e}")
        return False

if __name__ == "__main__":
    print("Testing database operations...")
    test_operations()
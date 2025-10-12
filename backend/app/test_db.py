import sys
import os

# Add current directory to path to import database
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import engine, SessionLocal
from sqlalchemy import text

def test_connection():
    try:
        # Test basic connection
        with engine.connect() as connection:
            print("✅ Successfully connected to PostgreSQL!")
            
        # Test version query
        with SessionLocal() as session:
            result = session.execute(text("SELECT version();"))
            version = result.fetchone()
            print(f"✅ PostgreSQL version: {version[0]}")
            
        # Test database operations
        with SessionLocal() as session:
            # Check if our table exists
            result = session.execute(text("""
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = 'profiles'
                );
            """))
            table_exists = result.fetchone()[0]
            print(f"✅ Profiles table exists: {table_exists}")
            
        return True
        
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

if __name__ == "__main__":
    print("Testing database connection...")
    test_connection()
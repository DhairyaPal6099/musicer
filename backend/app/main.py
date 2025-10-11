from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Profile(BaseModel):
    name: str
    email: str
    profile_picture_url: str

@app.post("/profile")
def save_profile(profile: Profile):
    # cursor.execute some database insertion
    return {"message": "Profile saved", "user_id": "replace with fetched user id"}
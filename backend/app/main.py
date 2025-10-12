from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
def save_profile():
    return {"message": "YOBRO"}
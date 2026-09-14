from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import auth, workouts, nutrition

# Create DB Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="FITZER AI API")

# Setup CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(workouts.router, prefix="/api/workouts", tags=["Workouts"])
app.include_router(nutrition.router, prefix="/api/nutrition", tags=["Nutrition"])

@app.get("/")
def read_root():
    return {"message": "Welcome to FITZER AI Backend!"}

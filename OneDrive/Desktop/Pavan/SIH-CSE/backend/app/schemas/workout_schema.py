from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class WorkoutSessionCreate(BaseModel):
    exercise_type: str
    rep_count: int
    performance_score: float
    duration_seconds: int

class WorkoutSessionResponse(WorkoutSessionCreate):
    id: int
    user_id: int
    timestamp: datetime

    class Config:
        from_attributes = True

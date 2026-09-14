from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import User, WorkoutSession
from app.schemas.workout_schema import WorkoutSessionCreate, WorkoutSessionResponse
from app.dependencies import get_current_user

router = APIRouter()

@router.post("/", response_model=WorkoutSessionResponse)
def save_workout(
    workout: WorkoutSessionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_workout = WorkoutSession(
        user_id=current_user.id,
        exercise_type=workout.exercise_type,
        rep_count=workout.rep_count,
        performance_score=workout.performance_score,
        duration_seconds=workout.duration_seconds
    )
    db.add(db_workout)
    db.commit()
    db.refresh(db_workout)
    return db_workout

@router.get("/", response_model=List[WorkoutSessionResponse])
def get_workouts(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    limit: int = 10
):
    return db.query(WorkoutSession).filter(WorkoutSession.user_id == current_user.id).order_by(WorkoutSession.timestamp.desc()).limit(limit).all()

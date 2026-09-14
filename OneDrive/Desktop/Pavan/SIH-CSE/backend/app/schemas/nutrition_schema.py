from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ProfileUpdate(BaseModel):
    age: Optional[int] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    gender: Optional[str] = None
    activity_level: Optional[str] = None
    diet_preference: Optional[str] = None
    goal: Optional[str] = None

class NutritionLogCreate(BaseModel):
    date: str
    food_name: str
    calories: float
    protein: float
    carbs: float
    fats: float

class NutritionLogResponse(NutritionLogCreate):
    id: int
    user_id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class NutritionSummary(BaseModel):
    date: str
    total_calories: float
    total_protein: float
    total_carbs: float
    total_fats: float
    target_calories: float

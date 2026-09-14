from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import User, Profile, NutritionLog
from app.schemas.nutrition_schema import ProfileUpdate, NutritionLogCreate, NutritionLogResponse, NutritionSummary
from app.dependencies import get_current_user

router = APIRouter()

def calculate_bmr(weight: float, height: float, age: int, gender: str) -> float:
    # Mifflin-St Jeor Equation
    if not (weight and height and age):
        return 2000.0
    bmr = (10 * weight) + (6.25 * height) - (5 * age)
    if gender and gender.lower() == "female":
        bmr -= 161
    else:
        bmr += 5
    return bmr

def get_tdee(bmr: float, activity_level: str) -> float:
    multipliers = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
        "very_active": 1.9
    }
    return bmr * multipliers.get(activity_level or "moderate", 1.55)

@router.post("/profile")
def update_profile(
    profile_data: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        profile = Profile(user_id=current_user.id)
        db.add(profile)
        
    for key, value in profile_data.dict(exclude_unset=True).items():
        setattr(profile, key, value)
        
    db.commit()
    db.refresh(profile)
    return profile

@router.get("/profile")
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        return {}
        
    # Calculate BMR and Target Calories
    bmr = calculate_bmr(profile.weight, profile.height, profile.age, profile.gender)
    tdee = get_tdee(bmr, profile.activity_level)
    
    target_calories = tdee
    if profile.goal == "cut":
        target_calories -= 500
    elif profile.goal == "bulk":
        target_calories += 500
        
    return {
        "profile": profile,
        "metrics": {
            "bmr": round(bmr, 2),
            "target_calories": round(target_calories, 2)
        }
    }

@router.post("/log", response_model=NutritionLogResponse)
def log_nutrition(
    log_data: NutritionLogCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_log = NutritionLog(user_id=current_user.id, **log_data.dict())
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return new_log

@router.get("/summary/{date}", response_model=NutritionSummary)
def get_nutrition_summary(
    date: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    logs = db.query(NutritionLog).filter(
        NutritionLog.user_id == current_user.id,
        NutritionLog.date == date
    ).all()
    
    # Target calculation
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    target = 2000.0
    if profile and profile.weight and profile.height and profile.age:
        bmr = calculate_bmr(profile.weight, profile.height, profile.age, profile.gender)
        target = get_tdee(bmr, profile.activity_level)
        if profile.goal == "cut": target -= 500
        elif profile.goal == "bulk": target += 500
    
    return {
        "date": date,
        "total_calories": sum(l.calories for l in logs),
        "total_protein": sum(l.protein for l in logs),
        "total_carbs": sum(l.carbs for l in logs),
        "total_fats": sum(l.fats for l in logs),
        "target_calories": round(target, 2)
    }

# Mock API for Meal Recommendations
@router.get("/recommend_meals")
def recommend_meals(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # In a full AI implementation, this would call LangChain/OpenAI
    # For now, it returns a demo mode result.
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    pref = profile.diet_preference if profile else "balanced"
    
    return {
        "status": "Demo Mode",
        "meals": {
            "breakfast": "Oatmeal with berries and protein powder (350 kcal)",
            "lunch": f"{'Tofu' if pref in ['vegan', 'vegetarian'] else 'Chicken'} breast with quinoa and roasted vegetables (500 kcal)",
            "dinner": f"{'Lentil stew' if pref in ['vegan', 'vegetarian'] else 'Baked salmon'} with sweet potato (450 kcal)",
            "snacks": "Greek yogurt and almonds (200 kcal)"
        }
    }

import json
import os
import math

MODEL_PATH = 'database.json'

class FitnessRecommender:
    def __init__(self):
        # Synthetic base data to train the model on initially
        self.base_data = [
            {"features": [1, 1, 1], "recommended_plan": "basic_cut"},
            {"features": [3, 3, 3], "recommended_plan": "advanced_bulk"},
            {"features": [2, 2, 2], "recommended_plan": "moderate_maintenance"},
            {"features": [1, 3, 2], "recommended_plan": "gym_bro_budget"}
        ]

    def _euclidean_distance(self, p1, p2):
        return math.sqrt(sum((a - b) ** 2 for a, b in zip(p1, p2)))

    def predict(self, user_profile):
        budget_map = {"budget-tight": 1, "budget-moderate": 2, "budget-flexible": 3}
        equip_map = {"bodyweight": 1, "bands": 2, "dumbbells": 3, "full-gym": 4}
        time_map = {"15-min": 1, "30-min": 2, "60-min": 3}
        
        b = budget_map.get(user_profile.get("budget", "budget-moderate"), 2)
        e = equip_map.get(user_profile.get("equipment", "bodyweight"), 1)
        t = time_map.get(user_profile.get("time", "30-min"), 2)
        
        user_features = [b, e, t]
        
        # Pure Python K-Nearest Neighbors (k=1)
        best_match = None
        min_dist = float('inf')
        
        for data in self.base_data:
            dist = self._euclidean_distance(user_features, data["features"])
            if dist < min_dist:
                min_dist = dist
                best_match = data["recommended_plan"]
                
        return self._get_plan_details(best_match)
        
    def _get_plan_details(self, plan_id):
        plans = {
            "basic_cut": {
                "workout_title": "Budget Fat Burner",
                "exercises": ["Jumping Jacks", "Bodyweight Squats", "Plank"],
                "diet_focus": "High protein, low carb, budget friendly."
            },
            "advanced_bulk": {
                "workout_title": "Premium Gym Hypertrophy",
                "exercises": ["Bench Press", "Squat Rack", "Deadlifts"],
                "diet_focus": "High calories, premium meats and supplements."
            },
            "moderate_maintenance": {
                "workout_title": "Student Balancer",
                "exercises": ["Dumbbell Curls", "Pushups", "Lunges"],
                "diet_focus": "Balanced macros, standard meals."
            },
            "gym_bro_budget": {
                "workout_title": "Dorm Room Beast",
                "exercises": ["Heavy Machine Work", "Free Weights"],
                "diet_focus": "Eggs, Soy chunks, cheap bulk protein."
            }
        }
        return plans.get(plan_id, plans["moderate_maintenance"])

recommender = FitnessRecommender()

def get_recommendation(user_profile):
    return recommender.predict(user_profile)

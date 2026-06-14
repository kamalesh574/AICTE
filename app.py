import streamlit as st
import ml_engine

st.set_page_config(page_title="AuraFit AI", page_icon="⚡", layout="centered")

st.title("⚡ AuraFit AI")
st.subheader("Personalized Student Workout & Diet Planner")

st.markdown("""
Welcome to AuraFit! Let our AI generate a personalized, budget-friendly fitness plan for you based on your constraints.
""")

st.divider()

col1, col2 = st.columns(2)

with col1:
    st.markdown("### Profile Information")
    age = st.number_input("Age", min_value=16, max_value=80, value=20)
    weight = st.number_input("Weight (kg)", min_value=40, max_value=150, value=70)
    goal = st.selectbox("Fitness Goal", ["Lean Muscle", "Weight Loss", "Endurance"])

with col2:
    st.markdown("### Constraints")
    budget = st.selectbox("Budget", ["budget-tight", "budget-moderate", "budget-flexible"], format_func=lambda x: x.replace('-', ' ').title())
    equipment = st.selectbox("Equipment", ["bodyweight", "bands", "dumbbells", "full-gym"], format_func=lambda x: x.replace('-', ' ').title())
    time = st.selectbox("Daily Time", ["15-min", "30-min", "60-min"])

st.divider()

if st.button("Generate AI Plan 🚀", use_container_width=True):
    with st.spinner("AI is analyzing your profile..."):
        user_profile = {
            "age": age,
            "weight": weight,
            "goal": goal,
            "budget": budget,
            "equipment": equipment,
            "time": time
        }
        
        # Get recommendation from our custom pure-Python ML engine
        plan = ml_engine.get_recommendation(user_profile)
        
        st.success("Plan Generated Successfully!")
        
        # Display the results
        st.markdown("---")
        st.markdown(f"## 🏋️ Recommended Workout: {plan['workout_title']}")
        
        for idx, exercise in enumerate(plan['exercises']):
            st.markdown(f"- **{exercise}**")
            
        st.markdown("---")
        st.markdown(f"## 🥗 Diet Strategy")
        st.info(plan['diet_focus'])

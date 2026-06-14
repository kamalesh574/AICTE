import streamlit as st
import ml_engine
import time
import datetime

# --- Page Config ---
st.set_page_config(page_title="AuraFit AI", page_icon="⚡", layout="wide", initial_sidebar_state="expanded")

# --- Custom Styling ---
st.markdown("""
<style>
    /* Bright theme accents */
    .stButton>button {
        background-color: #4f46e5;
        color: white;
        border-radius: 8px;
        font-weight: bold;
    }
    .stButton>button:hover {
        background-color: #4338ca;
        color: white;
    }
    .css-1d391kg {
        background-color: #f8fafc;
    }
    h1, h2, h3 {
        color: #1e293b;
        font-family: 'Inter', sans-serif;
    }
    /* Metric Card Styling */
    div[data-testid="stMetricValue"] {
        color: #4f46e5;
        font-weight: 800;
    }
</style>
""", unsafe_allow_html=True)

# --- Session State Initialization ---
if 'plan_generated' not in st.session_state:
    st.session_state['plan_generated'] = False
if 'user_plan' not in st.session_state:
    st.session_state['user_plan'] = None
if 'chat_history' not in st.session_state:
    st.session_state['chat_history'] = [{"role": "assistant", "content": "Hi Kamalesh! I'm your AuraFit AI Coach. Ask me anything about your generated workout or diet plan."}]
if 'completed_workouts' not in st.session_state:
    st.session_state['completed_workouts'] = set()

# --- Sidebar Navigation & Settings ---
with st.sidebar:
    st.title("⚡ AuraFit AI")
    st.caption("Student Fitness Hub")
    st.divider()
    
    # Navigation
    page = st.radio("Navigation", ["📊 Dashboard", "🏋️ Workout Planner", "🥗 Diet & Budget", "💬 AI Coach", "⚙️ Update Profile"])
    
    st.divider()
    st.markdown("### User Info")
    st.markdown("**Kamalesh**")
    st.caption("Student Plan | Light Mode")

# --- Page: Update Profile (Generator) ---
if page == "⚙️ Update Profile" or not st.session_state['plan_generated']:
    st.header("⚙️ Configure Your AI Profile")
    st.markdown("Enter your details so our Machine Learning model can cluster you with the best student templates.")
    
    col1, col2 = st.columns(2)
    with col1:
        age = st.number_input("Age", 16, 80, 20)
        weight = st.number_input("Weight (kg)", 40.0, 150.0, 70.0)
        goal = st.selectbox("Fitness Goal", ["Lean Muscle", "Weight Loss", "Endurance"])
    with col2:
        budget = st.selectbox("Budget Constraints", ["budget-tight", "budget-moderate", "budget-flexible"], format_func=lambda x: x.split('-')[1].title())
        equipment = st.selectbox("Available Equipment", ["bodyweight", "bands", "dumbbells", "full-gym"], format_func=lambda x: x.replace('-', ' ').title())
        time_avail = st.selectbox("Daily Time limit", ["15-min", "30-min", "60-min"])

    if st.button("Generate Personalized Plan 🚀", use_container_width=True):
        with st.spinner("AI is analyzing hundreds of templates..."):
            time.sleep(1.5)
            user_profile = {"age": age, "weight": weight, "goal": goal, "budget": budget, "equipment": equipment, "time": time_avail}
            st.session_state['user_plan'] = ml_engine.get_recommendation(user_profile)
            st.session_state['plan_generated'] = True
            st.session_state['completed_workouts'] = set()
            st.success("Plan updated successfully! Go to the Dashboard to view it.")

# --- Ensure Plan Exists before rendering other pages ---
elif st.session_state['plan_generated'] and st.session_state['user_plan']:
    plan = st.session_state['user_plan']
    
    # --- Page: Dashboard ---
    if page == "📊 Dashboard":
        st.header(f"Hello, Kamalesh! 👋")
        st.caption(f"Today is {datetime.date.today().strftime('%A, %B %d, %Y')}")
        
        # Top Metrics
        m1, m2, m3, m4 = st.columns(4)
        m1.metric("Daily Energy Goal", "2,233 kcal", "0 kcal consumed")
        m2.metric("Protein Intake", "154 g", "0 g logged")
        m3.metric("Workout Routine", plan['workout_title'], f"{len(st.session_state['completed_workouts'])}/{len(plan['exercises'])} done")
        m4.metric("Daily Food Cost", "₹120 / day", "Fits in Budget", delta_color="normal")
        
        st.divider()
        
        st.subheader("📅 Today's Schedule Overview")
        colA, colB = st.columns([2, 1])
        
        with colA:
            st.info("**Morning:** High Protein Breakfast & Supplements")
            st.warning(f"**Noon:** AI Workout Session: {plan['workout_title']}")
            st.success("**Evening:** Budget-Friendly Dinner (Focus: Recovery)")
        
        with colB:
            st.markdown("#### Student Saving Tips")
            st.markdown("> **Smart Protein Swap:** Buy dried soy chunks instead of expensive supplements. They offer 50g protein per ₹25!")

    # --- Page: Workout Planner ---
    elif page == "🏋️ Workout Planner":
        st.header("🏋️ Your Custom Routine")
        st.subheader(f"Current Plan: {plan['workout_title']}")
        st.progress(len(st.session_state['completed_workouts']) / max(len(plan['exercises']), 1))
        
        for idx, exercise in enumerate(plan['exercises']):
            ex_id = f"ex_{idx}"
            col1, col2 = st.columns([4, 1])
            with col1:
                with st.expander(f"**{exercise}** (3 Sets x 10-12 Reps)", expanded=True):
                    st.write(f"Focus on form. Rest for 60 seconds between sets.")
            with col2:
                # Use a checkbox to mark complete
                done = st.checkbox("Done", key=ex_id)
                if done:
                    st.session_state['completed_workouts'].add(idx)
                elif idx in st.session_state['completed_workouts']:
                    st.session_state['completed_workouts'].remove(idx)
                    
        if len(st.session_state['completed_workouts']) == len(plan['exercises']):
            st.balloons()
            st.success("Workout Complete! Great job today.")

    # --- Page: Diet & Budget ---
    elif page == "🥗 Diet & Budget":
        st.header("🥗 Diet & Budget Hub")
        st.markdown(f"**AI Strategy:** {plan['diet_focus']}")
        
        st.markdown("### Recommended Meals")
        
        with st.container():
            col1, col2 = st.columns(2)
            with col1:
                st.markdown("#### 🍳 Breakfast")
                st.write("**Oats & Peanut Butter**")
                st.caption("450 kcal | 20g Protein | ₹30")
                
                st.markdown("#### 🍛 Lunch")
                st.write("**Lentil Curry (Dal) & Rice**")
                st.caption("600 kcal | 25g Protein | ₹40")
                
            with col2:
                st.markdown("#### 🥩 Dinner")
                st.write("**Soy Chunks Stir Fry**")
                st.caption("550 kcal | 40g Protein | ₹35")
                
                st.markdown("#### 🥜 Snacks")
                st.write("**Roasted Chana**")
                st.caption("200 kcal | 10g Protein | ₹15")
                
        st.divider()
        st.metric("Total Estimated Cost", "₹120", "Very Cheap")

    # --- Page: AI Coach ---
    elif page == "💬 AI Coach":
        st.header("💬 AI Fitness Coach")
        st.markdown("Chat with your personal assistant about exercises, alternative meals, or motivation.")
        
        # Display chat history
        for msg in st.session_state['chat_history']:
            with st.chat_message(msg["role"]):
                st.markdown(msg["content"])
                
        # Chat input
        if prompt := st.chat_input("Ask a question (e.g. 'Can I swap rice for roti?')"):
            # Append user msg
            st.session_state['chat_history'].append({"role": "user", "content": prompt})
            with st.chat_message("user"):
                st.markdown(prompt)
                
            # Generate AI response (Mocked for now since we don't have an LLM connected in ml_engine yet)
            with st.chat_message("assistant"):
                with st.spinner("Thinking..."):
                    time.sleep(1)
                    response = f"That's a great question about '{prompt}'. Yes, you can make that swap as long as you track your calories. Let me know if you need specific macro breakdowns!"
                    st.markdown(response)
            st.session_state['chat_history'].append({"role": "assistant", "content": response})

else:
    st.warning("Please configure your profile first to generate a plan.")

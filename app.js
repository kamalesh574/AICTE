// ----------------------------------------------------
// AuraFit AI - Core Application Logic
// ----------------------------------------------------

// Default Templates for AI Plan Generator
const MEAL_TEMPLATES = {
    'indian-veg': {
        'budget-tight': {
            breakfast: { title: "Masala Oats & Roasted Peanuts", ingredients: "Rolled oats (50g), peanuts (30g), green chillies, turmeric", cals: 380, p: 14, c: 45, f: 16, prep: "Microwave or cook oats on induction with water. Stir in roasted peanuts, spices, and salt." },
            lunch: { title: "Spiced Chickpea Salad (Chana Chaat)", ingredients: "Boiled black chickpeas (100g), onion, tomato, lemon, cucumber", cals: 420, p: 18, c: 60, f: 8, prep: "Mix boiled chickpeas with chopped veggies, lemon juice, and chaat masala. No cooking needed." },
            dinner: { title: "Tadka Dal & Roti with Curd", ingredients: "Yellow split lentils (dal) (70g), 2 whole wheat rotis, low fat curd (100g)", cals: 480, p: 20, c: 75, f: 10, prep: "Boil dal. Heat ghee/oil, splutter cumin, onions, garlic. Serve with roti and curd." },
            snack: { title: "Roasted Chana & Green Tea", ingredients: "Roasted chickpeas (40g), organic green tea bag", cals: 150, p: 8, c: 24, f: 2, prep: "Crunchy snack ready to eat. Steep green tea in hot water." }
        },
        'budget-moderate': {
            breakfast: { title: "Paneer Bhurji with 2 Brown Bread Slices", ingredients: "Low fat paneer (100g), onion, tomato, bread, spices", cals: 450, p: 24, c: 38, f: 18, prep: "Crumble paneer. Sauté onion and tomato in 1 tsp oil, add spices, stir in paneer. Toast bread." },
            lunch: { title: "Soya Chunks Pulao & Cucumber Raita", ingredients: "Soya chunks (50g), basmati rice (70g), yoghurt (150g), spices", cals: 520, p: 32, c: 80, f: 6, prep: "Soak soya chunks. Sauté with rice and spices. Cook in a cooker/pot. Mix grated cucumber with yogurt." },
            dinner: { title: "Dal Makhani (Healthy Style) & Rice", ingredients: "Whole black lentils (80g), brown/white rice (80g), light cream", cals: 550, p: 22, c: 90, f: 12, prep: "Boil lentils till soft. Mash slightly. Cook with tomato purée, garlic, minimal butter. Serve with rice." },
            snack: { title: "Peanut Butter Toast & Banana", ingredients: "1 slice brown bread, peanut butter (15g), 1 medium banana", cals: 260, p: 9, c: 40, f: 10, prep: "Spread peanut butter on toast. Top with sliced banana." }
        },
        'budget-flexible': {
            breakfast: { title: "Greek Yoghurt Fruit Bowl & Chia Seeds", ingredients: "Greek yoghurt (200g), mixed berries, almonds, chia seeds", cals: 410, p: 25, c: 30, f: 16, prep: "Layer yoghurt in a bowl, top with washed berries, crushed almonds, and chia seeds." },
            lunch: { title: "Tofu Quinoa Bowl with Stir-fried Veggies", ingredients: "Organic tofu (150g), quinoa (80g), broccoli, bell pepper", cals: 510, p: 28, c: 65, f: 14, prep: "Cook quinoa. Cube tofu and stir-fry in olive oil with bell peppers and broccoli. Drizzle soy sauce." },
            dinner: { title: "High-Protein Paneer Roti & Salad", ingredients: "Paneer (120g), 2 multigrain rotis, green salad, olive oil", cals: 580, p: 28, c: 50, f: 26, prep: "Grill paneer blocks. Serve with multigrain rotis and fresh green salad dressed in olive oil." },
            snack: { title: "Whey Protein Shake & Mixed Nuts", ingredients: "1 scoop Whey Protein, skimmed milk (250ml), almonds (15g)", cals: 280, p: 30, c: 15, f: 10, prep: "Blend protein powder with cold milk. Eat nuts on the side." }
        }
    },
    'indian-nonveg': {
        'budget-tight': {
            breakfast: { title: "Spiced Egg Bhurji & Roti", ingredients: "3 whole eggs, onion, tomato, spices, 1 whole wheat roti", cals: 420, p: 22, c: 35, f: 18, prep: "Whisk eggs. Sauté veggies in a pan. Pour eggs and scramble. Serve warm with toasted roti." },
            lunch: { title: "Egg & Potato Curry with Steamed Rice", ingredients: "2 boiled eggs, 1 potato, white rice (80g), spices", cals: 510, p: 18, c: 78, f: 12, prep: "Make a simple tomato-onion gravy. Slice boiled eggs and simmer with potato cubes. Serve over rice." },
            dinner: { title: "Chicken Keema (Minced) & Roti", ingredients: "Minced chicken (120g), onion, spices, 2 whole wheat rotis", cals: 530, p: 35, c: 48, f: 15, prep: "Sauté onions, ginger, garlic. Add minced chicken and dry spices. Cook covered for 15 mins. Eat with roti." },
            snack: { title: "Boiled Egg (White only) & Spiced Tea", ingredients: "2 egg whites, black tea/milk tea", cals: 80, p: 8, c: 3, f: 0, prep: "Boil eggs. Discard yolks, sprinkle black pepper on egg whites. Pair with tea." }
        },
        'budget-moderate': {
            breakfast: { title: "Egg White Omelette with Mushrooms & Toast", ingredients: "4 egg whites, mushrooms (50g), spinach, 2 slices whole wheat bread", cals: 320, p: 22, c: 34, f: 4, prep: "Whisk egg whites. Sauté mushrooms and spinach, pour eggs. Fold and cook. Serve with toast." },
            lunch: { title: "Chicken Breast Pulao & Curd", ingredients: "Chicken breast (150g), basmati rice (80g), yoghurt (100g), spices", cals: 580, p: 42, c: 75, f: 10, prep: "Cube chicken breast. Sauté with onion, spices, and rice. Pressure cook with water. Serve with chilled curd." },
            dinner: { title: "Fish Curry (Rohu/Katla) & Brown Rice", ingredients: "River fish fillet (150g), brown rice (80g), coconut milk, spices", cals: 520, p: 30, c: 70, f: 12, prep: "Sear marinated fish. Prepare curry with onion purée, spices, and a dash of coconut milk. Simmer fish." },
            snack: { title: "Spiced Sprouts & Peanut Salad", ingredients: "Mixed sprouts (50g), roasted peanuts (20g), lemon, onion", cals: 210, p: 11, c: 22, f: 9, prep: "Mix boiled sprouts with peanuts, chopped onions, tomato, lemon juice, and salt." }
        },
        'budget-flexible': {
            breakfast: { title: "Scrambled Eggs, Avocado & Smoked Salmon", ingredients: "3 eggs, avocado (50g), whole wheat bread, optional salmon", cals: 490, p: 26, c: 28, f: 28, prep: "Scramble eggs in butter. Toast bread, mash avocado on top, lay eggs and seasoning." },
            lunch: { title: "Grilled Salmon/Chicken Quinoa Bowl", ingredients: "Chicken breast or salmon (180g), quinoa (80g), asparagus", cals: 620, p: 48, c: 55, f: 18, prep: "Season and grill chicken/salmon. Cook quinoa. Serve with roasted asparagus." },
            dinner: { title: "Lean Chicken Tikka with Multigrain Roti", ingredients: "Boneless chicken breast (200g), yoghurt marinade, 2 rotis", cals: 580, p: 52, c: 45, f: 12, prep: "Marinate chicken in yoghurt and spices. Grill in oven or pan. Serve with rotis and mint chutney." },
            snack: { title: "Whey Protein Shake & Almonds", ingredients: "1 scoop Whey, 250ml almond milk, almonds (20g)", cals: 260, p: 27, c: 10, f: 13, prep: "Shake whey and almond milk. Consume with raw almonds." }
        }
    },
    'mediterranean': {
        'budget-tight': {
            breakfast: { title: "Greek Olive & Tomato Toast with Hummus", ingredients: "Hummus (30g), 2 slices bread, olives, sliced tomato", cals: 310, p: 10, c: 42, f: 12, prep: "Toast bread. Spread hummus, top with sliced tomatoes, olives, and a pinch of oregano." },
            lunch: { title: "White Bean & Tuna Salad", ingredients: "Canned tuna in water (1 can), canned white beans (100g), olive oil", cals: 440, p: 32, c: 38, f: 15, prep: "Drain tuna and beans. Toss together with 1 tbsp olive oil, lemon juice, salt, pepper, and onion." },
            dinner: { title: "Lentil Soup (Fakes) with Feta & Bread", ingredients: "Brown lentils (80g), tomatoes, olive oil (10g), feta cheese (30g)", cals: 510, p: 22, c: 68, f: 14, prep: "Simmer lentils with onion, garlic, tomato paste, and bay leaf. Stir in olive oil. Serve with feta." },
            snack: { title: "Apple slices with Peanut Butter", ingredients: "1 apple, peanut butter (15g)", cals: 180, p: 4, c: 22, f: 9, prep: "Core and slice apple. Serve with peanut butter dip." }
        },
        'budget-moderate': {
            breakfast: { title: "Mediterranean Egg Omelette & Feta", ingredients: "3 eggs, olives, cherry tomatoes, spinach, feta (20g)", cals: 380, p: 22, c: 8, f: 30, prep: "Sauté spinach and tomatoes in olive oil. Pour whisked eggs. Sprinkle feta and olives. Fold." },
            lunch: { title: "Greek Grilled Chicken Wrap", ingredients: "Chicken breast (120g), pita bread, cucumber, tzatziki sauce", cals: 490, p: 34, c: 45, f: 16, prep: "Grill sliced chicken. Fill pita with chicken, cucumber slices, tomato, and tzatziki." },
            dinner: { title: "Baked Fish with Garlic, Lemon & Couscous", ingredients: "White fish fillet (150g), couscous (70g), olive oil, zucchini", cals: 520, p: 32, c: 60, f: 14, prep: "Bake fish with garlic, lemon slices, and herbs. Steam couscous. Sauté zucchini in olive oil." },
            snack: { title: "Hummus with Cucumber & Carrot Sticks", ingredients: "Hummus (50g), cucumber (1), carrot (1)", cals: 160, p: 6, c: 18, f: 8, prep: "Slice vegetables into sticks. Dip in hummus." }
        },
        'budget-flexible': {
            breakfast: { title: "Shakshuka (Eggs poached in Spicy Tomato)", ingredients: "3 eggs, bell peppers, tomato sauce, olive oil, sourdough bread", cals: 460, p: 24, c: 38, f: 22, prep: "Sauté onion, garlic, peppers. Pour tomato sauce, make wells, crack eggs. Cover and poach. Serve with sourdough." },
            lunch: { title: "Mediterranean Quinoa Salmon Salad", ingredients: "Grilled salmon (150g), quinoa (80g), cucumber, olives, feta", cals: 610, p: 42, c: 50, f: 24, prep: "Toss cooked quinoa with chopped cucumber, kalamata olives, crumbled feta. Top with grilled salmon." },
            dinner: { title: "Grilled Shrimp Pasta with Pesto & Asparagus", ingredients: "Shrimp (150g), whole wheat pasta (80g), basil pesto (30g)", cals: 590, p: 38, c: 68, f: 18, prep: "Boil pasta. Sear shrimp in olive oil. Toss pasta with pesto, steam asparagus, and fold in shrimp." },
            snack: { title: "Walnuts, Almonds & Dried Figs", ingredients: "Walnuts (15g), almonds (15g), 2 dried figs", cals: 240, p: 6, c: 26, f: 15, prep: "Ready to eat mix." }
        }
    },
    'western-standard': {
        'budget-tight': {
            breakfast: { title: "Banana Peanut Butter Oatmeal", ingredients: "Rolled oats (50g), peanut butter (20g), 1 banana, water", cals: 390, p: 11, c: 58, f: 14, prep: "Cook oats with water. Stir in peanut butter and top with sliced banana." },
            lunch: { title: "Tuna Salad Sandwich", ingredients: "Canned tuna in water (1 can), light mayo (15g), 2 slices bread", cals: 360, p: 26, c: 32, f: 10, prep: "Mix drained tuna with mayo, salt, pepper. Spread between bread slices." },
            dinner: { title: "Chicken Breast, White Rice & Broccoli", ingredients: "Chicken breast (130g), white rice (80g), broccoli (100g)", cals: 490, p: 36, c: 65, f: 5, prep: "Pan-sear chicken breast. Cook rice. Steam broccoli. Serve together." },
            snack: { title: "Hard Boiled Eggs", ingredients: "2 whole eggs, salt, pepper", cals: 140, p: 12, c: 1, f: 10, prep: "Boil eggs for 9 mins. Cool, peel, cut in half, and season." }
        },
        'budget-moderate': {
            breakfast: { title: "Scrambled Eggs, Turkey Bacon & Toast", ingredients: "3 eggs, turkey bacon (2 strips), 2 slices whole wheat toast", cals: 420, p: 26, c: 34, f: 18, prep: "Pan-fry turkey bacon. Scramble eggs in a bit of butter. Toast bread." },
            lunch: { title: "Chicken & Cheese Quesadilla", ingredients: "Chicken breast (120g), 1 large tortilla, cheddar cheese (30g)", cals: 530, p: 38, c: 40, f: 20, prep: "Shred cooked chicken. Place on tortilla with cheese, fold, and pan-toast until crispy." },
            dinner: { title: "Beef Burger Patty with Sweet Potato Fries", ingredients: "Lean beef patty (150g), sweet potato (150g), olive oil", cals: 580, p: 34, c: 45, f: 28, prep: "Bake or air-fry sliced sweet potatoes with oil. Grill beef patty in a skillet." },
            snack: { title: "Cottage Cheese & Honey", ingredients: "Cottage cheese (150g), honey (1 tsp)", cals: 160, p: 18, c: 12, f: 4, prep: "Top cottage cheese with a drizzle of honey." }
        },
        'budget-flexible': {
            breakfast: { title: "Protein Pancakes with Blueberries & Syrup", ingredients: "Protein pancake mix (80g), fresh blueberries, maple syrup", cals: 430, p: 24, c: 65, f: 6, prep: "Whisk mix with water. Cook on a skillet. Serve topped with berries and syrup." },
            lunch: { title: "Steak, Quinoa & Roasted Asparagus", ingredients: "Sirloin steak (180g), quinoa (80g), asparagus (100g)", cals: 630, p: 46, c: 55, f: 22, prep: "Pan-sear steak to desired doneness. Cook quinoa. Roast asparagus in oven." },
            dinner: { title: "Baked Salmon, Wild Rice & Green Beans", ingredients: "Salmon fillet (180g), wild rice (80g), green beans (100g)", cals: 590, p: 40, c: 60, f: 20, prep: "Season salmon, bake for 12 mins. Boil wild rice. Steam green beans." },
            snack: { title: "Whey Protein Shake & Rice Cakes", ingredients: "1 scoop Whey, 2 rice cakes, peanut butter (10g)", cals: 260, p: 27, c: 24, f: 6, prep: "Spread PB on rice cakes. Drink protein shake on side." }
        }
    },
    'vegan': {
        'budget-tight': {
            breakfast: { title: "Sattu High Protein Drink & Banana", ingredients: "Sattu/roasted chickpea flour (40g), water, lemon, 1 banana", cals: 320, p: 12, c: 58, f: 4, prep: "Stir sattu powder in cold water with lemon juice and salt. Eat banana on the side." },
            lunch: { title: "Black Eyed Peas Salad & Rice", ingredients: "Boiled black eyed peas (100g), onion, tomato, white rice (70g)", cals: 460, p: 16, c: 80, f: 6, prep: "Toss boiled black eyed peas with chopped veggies. Serve with plain steamed rice." },
            dinner: { title: "Yellow Lentil Khichdi (One-Pot)", ingredients: "Moong dal (50g), rice (50g), spinach, spices", cals: 420, p: 16, c: 78, f: 4, prep: "Pressure cook dal, rice, and chopped spinach with spices and plenty of water." },
            snack: { title: "Roasted Soybeans", ingredients: "Dry roasted soybeans (30g)", cals: 130, p: 12, c: 10, f: 5, prep: "Ready to eat crunchy snack." }
        },
        'budget-moderate': {
            breakfast: { title: "Tofu Scramble & Toast", ingredients: "Firm tofu (150g), turmeric, nutritional yeast, 2 slices toast", cals: 360, p: 22, c: 38, f: 12, prep: "Crumble tofu. Sauté in oil with turmeric, salt, pepper, nutritional yeast. Serve with toast." },
            lunch: { title: "Chickpea Coconut Curry & Rice", ingredients: "Boiled chickpeas (100g), coconut milk (50ml), brown rice (80g)", cals: 540, p: 18, c: 85, f: 12, prep: "Simmer chickpeas in onion-tomato base with coconut milk. Serve over hot brown rice." },
            dinner: { title: "Tempeh Stir-fry with Broccoli & Soba Noodles", ingredients: "Tempeh (100g), broccoli, carrot, soba noodles (80g)", cals: 510, p: 25, c: 70, f: 14, prep: "Boil noodles. Sauté cubed tempeh and veggies in ginger-soy sauce. Toss with noodles." },
            snack: { title: "Hummus & Pita Bread", ingredients: "Hummus (50g), 1 whole wheat pita bread", cals: 230, p: 8, c: 38, f: 6, prep: "Warm pita bread and serve with hummus dip." }
        },
        'budget-flexible': {
            breakfast: { title: "Vegan Protein Chia Berry Pudding", ingredients: "Vegan protein powder (1 scoop), chia seeds (20g), almond milk, berries", cals: 340, p: 26, c: 25, f: 14, prep: "Mix chia, protein, and milk. Let sit overnight. Top with fresh berries." },
            lunch: { title: "High-Protein Lentil & Quinoa Salad Bowl", ingredients: "Brown lentils (100g), quinoa (80g), avocado (50g), seeds", cals: 560, p: 26, c: 75, f: 16, prep: "Toss cooked lentils and quinoa with salad leaves, chopped avocado, and pumpkin seeds." },
            dinner: { title: "Seitan Steak, Baked Potato & Asparagus", ingredients: "Homemade/store seitan (150g), 1 large potato, asparagus", cals: 590, p: 48, c: 62, f: 12, prep: "Pan-sear seitan steak. Bake potato. Grill asparagus in olive oil." },
            snack: { title: "Vegan Protein Bar & Almonds", ingredients: "1 organic vegan bar, raw almonds (15g)", cals: 290, p: 20, c: 22, f: 14, prep: "Ready to eat." }
        }
    }
};

const WORKOUT_TEMPLATES = {
    'bodyweight': {
        '15-min': [
            { name: "Jumping Jacks", reps: "45 sec work • 15 sec rest", target: "Full Body Warm Up" },
            { name: "Bodyweight Squats", reps: "3 sets x 12 reps", target: "Quads & Glutes" },
            { name: "Incline/Standard Pushups", reps: "3 sets x 8-12 reps", target: "Chest & Triceps" },
            { name: "Plank Hold", reps: "3 sets x 30 sec", target: "Core Stability" }
        ],
        '30-min': [
            { name: "Jumping Jacks / Arm Circles", reps: "3 mins dynamic warm up", target: "Heart Rate & Joints" },
            { name: "Bodyweight Squats", reps: "4 sets x 15 reps", target: "Quads & Glutes" },
            { name: "Pushups (Dorm Floor)", reps: "4 sets x 12 reps", target: "Chest, Shoulders & Triceps" },
            { name: "Reverse Lunges", reps: "3 sets x 12 reps per leg", target: "Hamstrings & Balance" },
            { name: "Glute Bridges (Dorm Bed/Floor)", reps: "3 sets x 15 reps", target: "Glutes & Lower Back" },
            { name: "Plank-to-Pushup", reps: "3 sets x 8 reps", target: "Core & Shoulders" }
        ],
        '60-min': [
            { name: "Dynamic Warm Up", reps: "5 mins mobility exercises", target: "Joint Lubrication" },
            { name: "Pistol Squats (Assisted by chair)", reps: "4 sets x 8 reps per leg", target: "Unilateral Leg Strength" },
            { name: "Decline Pushups (Feet on chair/bed)", reps: "4 sets x 12 reps", target: "Upper Chest & Shoulders" },
            { name: "Standard Pushups", reps: "4 sets x 15 reps", target: "Chest & Arms" },
            { name: "Bulgarian Split Squats (Foot on bed)", reps: "4 sets x 12 reps per leg", target: "Quads & Glutes" },
            { name: "Prone Y-T-W Extensions", reps: "3 sets x 12 reps", target: "Rear Delts & Upper Back" },
            { name: "Bicycle Crunches", reps: "3 sets x 20 reps", target: "Abs & Obliques" },
            { name: "Plank Hold", reps: "3 sets x 60 sec", target: "Core Endurance" }
        ]
    },
    'bands': {
        '15-min': [
            { name: "Dynamic Warm Up", reps: "2 mins chest openers", target: "Shoulder Joints" },
            { name: "Banded Squats", reps: "3 sets x 12 reps", target: "Legs & Glutes" },
            { name: "Banded Bent-over Rows", reps: "3 sets x 12 reps", target: "Lats & Upper Back" },
            { name: "Banded Overhead Press", reps: "3 sets x 10 reps", target: "Shoulders" }
        ],
        '30-min': [
            { name: "Dynamic Warm Up", reps: "3 mins dynamic stretching", target: "Full Body" },
            { name: "Banded Front Squats", reps: "4 sets x 12 reps", target: "Quads & Core" },
            { name: "Banded Bent-over Rows", reps: "4 sets x 15 reps", target: "Middle Back & Lats" },
            { name: "Banded Chest Fly", reps: "3 sets x 15 reps", target: "Pectorals" },
            { name: "Banded Shoulder Lateral Raise", reps: "3 sets x 15 reps", target: "Lateral Deltoids" },
            { name: "Banded Bicep Curls", reps: "3 sets x 12 reps", target: "Biceps" }
        ],
        '60-min': [
            { name: "Dynamic Warm Up", reps: "5 mins muscle prep", target: "Full Body" },
            { name: "Banded Romanian Deadlifts", reps: "4 sets x 15 reps", target: "Hamstrings & Glutes" },
            { name: "Banded Lat Pulldowns (Anchor to door)", reps: "4 sets x 12 reps", target: "Lats" },
            { name: "Banded Single-arm Chest Press", reps: "4 sets x 12 reps per side", target: "Chest & Triceps" },
            { name: "Banded Pull-aparts", reps: "4 sets x 20 reps", target: "Rear Delts & Posture" },
            { name: "Banded Overhead Tricep Extensions", reps: "3 sets x 15 reps", target: "Triceps" },
            { name: "Banded Bicep Curls", reps: "3 sets x 15 reps", target: "Biceps" },
            { name: "Banded Woodchoppers", reps: "3 sets x 12 reps per side", target: "Obliques" }
        ]
    },
    'dumbbells': {
        '15-min': [
            { name: "Arm Circles & Body squats", reps: "2 mins light prep", target: "Joint Mobilization" },
            { name: "DB Goblet Squats", reps: "3 sets x 12 reps", target: "Quads & Core" },
            { name: "DB Romanian Deadlifts", reps: "3 sets x 12 reps", target: "Hamstrings" },
            { name: "DB Floor Chest Press", reps: "3 sets x 12 reps", target: "Chest" }
        ],
        '30-min': [
            { name: "Dynamic Warm Up", reps: "3 mins mobility", target: "Full Body" },
            { name: "DB Goblet Squats", reps: "4 sets x 12 reps", target: "Legs" },
            { name: "DB Bent-over Rows", reps: "4 sets x 12 reps", target: "Upper Back" },
            { name: "DB Romanian Deadlifts", reps: "3 sets x 12 reps", target: "Hamstrings" },
            { name: "DB Overhead Press", reps: "3 sets x 10 reps", target: "Shoulders" },
            { name: "DB Hammer Curls", reps: "3 sets x 12 reps", target: "Arms" }
        ],
        '60-min': [
            { name: "Dynamic Warm Up", reps: "5 mins deep prep", target: "Full Body" },
            { name: "DB Bulgarian Split Squats", reps: "4 sets x 12 reps per leg", target: "Quads & Glutes" },
            { name: "DB Romanian Deadlifts", reps: "4 sets x 12 reps", target: "Hamstrings & Lower Back" },
            { name: "DB Floor Chest Press", reps: "4 sets x 15 reps", target: "Pectorals" },
            { name: "DB Single-arm Rows", reps: "4 sets x 12 reps per arm", target: "Lats" },
            { name: "DB Shoulder Lateral Raises", reps: "4 sets x 15 reps", target: "Shoulders" },
            { name: "DB Overhead Tricep Extensions", reps: "3 sets x 12 reps", target: "Triceps" },
            { name: "DB Bicep Curls", reps: "3 sets x 12 reps", target: "Biceps" }
        ]
    },
    'full-gym': {
        '15-min': [
            { name: "Jog on Treadmill", reps: "3 mins dynamic warm up", target: "Cardio Prep" },
            { name: "Barbell Goblet/Back Squats", reps: "3 sets x 10 reps", target: "Lower Body" },
            { name: "Lat Pulldown Machine", reps: "3 sets x 12 reps", target: "Upper Back & Lats" },
            { name: "Machine Chest Press", reps: "3 sets x 12 reps", target: "Chest" }
        ],
        '30-min': [
            { name: "Dynamic stretching", reps: "3 mins mobility joints", target: "Mobility" },
            { name: "Barbell Back Squats", reps: "4 sets x 10 reps", target: "Quads & Glutes" },
            { name: "Dumbbell Flat Bench Press", reps: "4 sets x 12 reps", target: "Pectorals" },
            { name: "Cable Seated Row", reps: "3 sets x 12 reps", target: "Lats & Mid-back" },
            { name: "Dumbbell Overhead Shoulder Press", reps: "3 sets x 10 reps", target: "Shoulders" },
            { name: "Hanging Leg Raises", reps: "3 sets x 12 reps", target: "Lower Abs" }
        ],
        '60-min': [
            { name: "Treadmill walk & dynamic prep", reps: "5 mins warm up", target: "Cardiorespiratory Warm Up" },
            { name: "Barbell Back Squats", reps: "4 sets x 8 reps (Heavy)", target: "Leg strength" },
            { name: "Barbell Flat Bench Press", reps: "4 sets x 8 reps (Heavy)", target: "Chest strength" },
            { name: "Barbell Romanian Deadlifts", reps: "4 sets x 10 reps", target: "Posterior Chain" },
            { name: "Cable Lat Pulldowns", reps: "4 sets x 12 reps", target: "Lats hypertrophy" },
            { name: "Dumbbell Lateral Raises", reps: "4 sets x 15 reps", target: "Shoulder width" },
            { name: "Tricep Rope Pushdowns", reps: "3 sets x 12 reps", target: "Triceps lateral head" },
            { name: "Incline DB Bicep Curls", reps: "3 sets x 12 reps", target: "Biceps long head" }
        ]
    }
};

const GROCERY_ESTIMATES = {
    "Rolled Oats (1kg)": { price: 160, cat: "Carbs" },
    "Brown Lentils / Dal (1kg)": { price: 120, cat: "Protein / Carbs" },
    "Chickpeas / Chana (1kg)": { price: 140, cat: "Protein / Carbs" },
    "Low Fat Paneer (500g)": { price: 220, cat: "Protein" },
    "Soya Chunks (1kg)": { price: 180, cat: "Protein" },
    "Basmati Rice (1kg)": { price: 90, cat: "Carbs" },
    "Whole Wheat Atta / Flour (2kg)": { price: 110, cat: "Carbs" },
    "Low Fat Curd / Yogurt (1kg)": { price: 90, cat: "Protein" },
    "Brown Bread (400g)": { price: 50, cat: "Carbs" },
    "Peanut Butter (500g)": { price: 190, cat: "Fats / Protein" },
    "Bananas (12 units)": { price: 60, cat: "Carbs" },
    "Whey Protein Powder (1kg, 30 servings)": { price: 2400, cat: "Protein Supplement" },
    "Organic Quinoa (500g)": { price: 250, cat: "Carbs / Protein" },
    "Greek Yogurt (400g)": { price: 180, cat: "Protein" },
    "Organic Tofu (400g)": { price: 150, cat: "Protein" },
    "Chia Seeds (150g)": { price: 120, cat: "Fats / Fiber" },
    "Almonds (250g)": { price: 240, cat: "Fats" },
    "Eggs (1 dozen)": { price: 84, cat: "Protein" },
    "Chicken Breast (1kg)": { price: 260, cat: "Protein" },
    "White Rice (1kg)": { price: 60, cat: "Carbs" },
    "Potatoes (1kg)": { price: 30, cat: "Carbs" },
    "Rohu River Fish (1kg)": { price: 280, cat: "Protein" },
    "Turkey Bacon (250g)": { price: 300, cat: "Protein" },
    "Lean Ground Beef (1kg)": { price: 650, cat: "Protein" },
    "Sweet Potatoes (1kg)": { price: 80, cat: "Carbs" },
    "Cottage Cheese / Paneer (400g)": { price: 160, cat: "Protein" },
    "Organic Honey (250g)": { price: 150, cat: "Carbs" },
    "Protein Pancake Mix (500g)": { price: 350, cat: "Carbs / Protein" },
    "Asparagus (250g)": { price: 180, cat: "Veggie" },
    "Broccoli (500g)": { price: 120, cat: "Veggie" },
    "Sirloin Steak (500g)": { price: 850, cat: "Protein" },
    "Salmon Fillet (500g)": { price: 950, cat: "Protein / Fats" },
    "Canned Tuna in water (3 cans)": { price: 270, cat: "Protein" },
    "Whole Wheat Pasta (500g)": { price: 150, cat: "Carbs" },
    "Basil Pesto Sauce (190g)": { price: 290, cat: "Fats / Sauce" },
    "Shrimp (500g)": { price: 400, cat: "Protein" },
    "Sattu Flour (500g)": { price: 80, cat: "Protein / Carbs" },
    "Green Salad Mix (200g)": { price: 90, cat: "Veggie" },
    "Coconut Milk (400ml)": { price: 110, cat: "Fats" },
    "Tempeh (200g)": { price: 160, cat: "Protein" },
    "Soba Noodles (300g)": { price: 180, cat: "Carbs" },
    "Vegan Protein Powder (1kg)": { price: 1800, cat: "Protein Supplement" }
};

// ----------------------------------------------------
// State Management
// ----------------------------------------------------
const AppState = {
    profile: {
        name: "Kamalesh",
        gender: "male",
        age: 20,
        weight: 70,
        height: 175,
        goal: "lean-muscle",
        budget: "budget-moderate",
        equipment: "full-gym",
        kitchen: "shared-kitchen",
        time: "30-min",
        cuisine: "indian-veg",
        allergies: "",
        activity: "lightly-active"
    },
    onboarded: false,
    currentTab: "dashboard",
    meals: [],
    workout: [],
    groceryList: [],
    chatHistory: [],
    waterIntake: 0,
    dailyWeightLogs: [71.2, 70.8, 70.6, 70.3, 70.1, 70.0],
    dailyCalorieLogs: [1950, 2100, 2050, 2200, 1800, 2000],
    activeStreak: 3,
    voiceGuidance: true
};

const STATE_KEY = "aurafit_state_v1";

async function loadState() {
    try {
        const response = await fetch('/api/user/default_user');
        if (response.ok) {
            const result = await response.json();
            if (result.status === "success" && result.data) {
                Object.assign(AppState, result.data);
            }
        } else {
            console.log("No existing user found on server, using defaults.");
        }
    } catch (e) {
        console.error("Failed to load state from server", e);
    }
}

async function saveState() {
    try {
        const dataToSave = { id: "default_user", ...AppState };
        await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSave)
        });
    } catch (e) {
        console.error("Failed to save state to server", e);
    }
}
// ----------------------------------------------------
// AI Rules Engine (Generators)
// ----------------------------------------------------
function calculateNutrientTargets() {
    const w = parseFloat(AppState.profile.weight);
    const h = parseFloat(AppState.profile.height);
    const a = parseInt(AppState.profile.age);
    
    // Simple BMR estimation (Mifflin-St Jeor)
    let bmr = 0;
    if (AppState.profile.gender === "male") {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }
    
    // TDEE multipliers
    let multiplier = 1.2; // sedentary
    if (AppState.profile.activity === "lightly-active") multiplier = 1.375;
    else if (AppState.profile.activity === "moderately-active") multiplier = 1.55;
    else if (AppState.profile.activity === "very-active") multiplier = 1.725;
    
    const tdee = Math.round(bmr * multiplier);
    let targetCals = tdee;
    
    // Goal adjustments
    if (AppState.profile.goal === "lean-muscle") targetCals += 300;
    else if (AppState.profile.goal === "weight-loss") targetCals -= 400;
    else if (AppState.profile.goal === "endurance") targetCals += 100;
    
    // Macronutrient splits
    let protein = 0, carbs = 0, fats = 0;
    if (AppState.profile.goal === "lean-muscle") {
        // High protein, high carb
        protein = Math.round(w * 2.0); // 2g per kg
        fats = Math.round(w * 1.0); // 1g per kg
        carbs = Math.round((targetCals - (protein * 4 + fats * 9)) / 4);
    } else if (AppState.profile.goal === "weight-loss") {
        // High protein, lower carb
        protein = Math.round(w * 2.2); // 2.2g per kg to preserve lean tissue
        fats = Math.round(w * 0.9);
        carbs = Math.round((targetCals - (protein * 4 + fats * 9)) / 4);
    } else {
        // Moderate split
        protein = Math.round(w * 1.6);
        fats = Math.round(w * 1.0);
        carbs = Math.round((targetCals - (protein * 4 + fats * 9)) / 4);
    }
    
    return { calories: targetCals, protein, carbs, fats };
}

async function runAIGenerator() {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(AppState.profile)
        });
        
        if (response.ok) {
            const result = await response.json();
            if (result.status === "success" && result.data) {
                // Map API response to AppState format
                const data = result.data;
                
                // 1. Map Workouts
                if (data.workout) {
                    AppState.workout = data.workout.map(ex => ({
                        name: ex.name,
                        reps: ex.desc,
                        target: "AI Target",
                        completed: ex.done
                    }));
                }
                
                // 2. Map Meals
                if (data.diet) {
                    const generatedMeals = [];
                    Object.keys(data.diet).forEach(key => {
                        generatedMeals.push({
                            type: key.charAt(0).toUpperCase() + key.slice(1),
                            title: data.diet[key].title,
                            ingredients: "AI Recommended Ingredients",
                            cals: data.diet[key].calories,
                            protein: data.diet[key].protein,
                            carbs: Math.round(data.diet[key].calories * 0.4 / 4), // estimation for MVP UI
                            fats: Math.round(data.diet[key].calories * 0.3 / 9),
                            prep: "Check with AI Coach for instructions",
                            completed: false
                        });
                    });
                    AppState.meals = generatedMeals;
                }
                
                // 3. Fallback Grocery List (we can update this later when backend supports it)
                AppState.groceryList = [
                    { name: "Rolled Oats (1kg)", cost: 160, category: "Carbs", checked: false },
                    { name: "Low Fat Paneer (500g)", cost: 220, category: "Protein", checked: false },
                    { name: "Eggs (1 dozen)", cost: 84, category: "Protein", checked: false }
                ];
                
                AppState.activeStreak = AppState.activeStreak || 0;
                await saveState();
                
                showToast("AI Plans Generated successfully!");
                syncDashboardMetrics();
                renderWorkoutTab();
                renderDietTab();
            }
        } else {
            console.error("Failed to generate plan from API");
            showToast("Failed to connect to AI server", "error");
        }
    } catch (e) {
        console.error("Error running AI generator", e);
        showToast("Error generating AI plan", "error");
    }
}

// ----------------------------------------------------
// UI Rendering Engine
// ----------------------------------------------------
const TabPanels = {
    dashboard: document.getElementById('panel-dashboard'),
    workout: document.getElementById('panel-workout'),
    diet: document.getElementById('panel-diet'),
    chat: document.getElementById('panel-chat'),
    analytics: document.getElementById('panel-analytics'),
    onboarding: document.getElementById('panel-onboarding')
};

const NavButtons = document.querySelectorAll('.sidebar-nav .nav-btn');

function showToast(text, type = "success") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconStr = "check-circle-2";
    if (type === "error") iconStr = "alert-circle";
    else if (type === "warning") iconStr = "alert-triangle";
    else if (type === "info") iconStr = "info";
    
    toast.innerHTML = `
        <span class="toast-icon"><i data-lucide="${iconStr}"></i></span>
        <span>${text}</span>
    `;
    
    container.appendChild(toast);
    lucide.createIcons();
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function switchTab(tabName) {
    if (tabName === 'onboarding') {
        TabPanels.onboarding.classList.add('active');
        return;
    }
    
    TabPanels.onboarding.classList.remove('active');
    
    // Deactivate all panels
    Object.keys(TabPanels).forEach(key => {
        if (key !== 'onboarding') {
            TabPanels[key].classList.remove('active');
        }
    });
    
    // Activate clicked panel
    if (TabPanels[tabName]) {
        TabPanels[tabName].classList.add('active');
        AppState.currentTab = tabName;
        saveState();
    }
    
    // Active navigation class
    NavButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        }
    });
    
    // Special initializations on tab load
    if (tabName === 'analytics') {
        renderCharts();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Onboarding Steps controller
let currentStep = 1;
const onboardingSteps = document.querySelectorAll('.form-step');
const onboardingDots = document.querySelectorAll('.step-indicator .step');

function setOnboardingStep(stepNum) {
    currentStep = stepNum;
    onboardingSteps.forEach(el => el.classList.remove('active'));
    onboardingDots.forEach(el => el.classList.remove('active'));
    
    document.querySelector(`.form-step[data-step="${stepNum}"]`).classList.add('active');
    document.querySelector(`.step-indicator .step[data-step="${stepNum}"]`).classList.add('active');
}

// ----------------------------------------------------
// UI Sync Render functions
// ----------------------------------------------------
function syncUserProfileDisplay() {
    document.getElementById('profile-user-name').innerText = AppState.profile.name || "Student Athlete";
    
    let goalText = "Stay Active";
    if (AppState.profile.goal === 'lean-muscle') goalText = "Muscle Gain";
    else if (AppState.profile.goal === 'weight-loss') goalText = "Weight Cut";
    else if (AppState.profile.goal === 'endurance') goalText = "Endurance";
    
    document.getElementById('profile-user-goal').innerText = goalText;
    document.getElementById('header-greeting').innerText = `Hello, ${AppState.profile.name || "Student"}!`;
}

function syncDashboardMetrics() {
    const targets = calculateNutrientTargets();
    document.getElementById('dash-cal-target').innerText = targets.calories.toLocaleString();
    document.getElementById('dash-protein-target').innerText = targets.protein;
    
    // Calculate totals from completed meals
    let consumedCals = 0;
    let loggedProtein = 0;
    AppState.meals.forEach(meal => {
        if (meal.completed) {
            consumedCals += meal.cals;
            loggedProtein += meal.protein;
        }
    });
    
    document.getElementById('dash-cal-status').innerText = `${consumedCals} kcal consumed today`;
    document.getElementById('dash-protein-status').innerText = `${loggedProtein}g logged`;
    
    const calFillPct = Math.min((consumedCals / targets.calories) * 100, 100);
    const pFillPct = Math.min((loggedProtein / targets.protein) * 100, 100);
    
    document.getElementById('dash-cal-fill').style.width = `${calFillPct}%`;
    document.getElementById('dash-protein-fill').style.width = `${pFillPct}%`;
    
    // Workout status
    const completedCount = AppState.workout.filter(w => w.completed).length;
    const workoutPct = Math.min((completedCount / AppState.workout.length) * 100, 100);
    document.getElementById('dash-workout-fill').style.width = `${workoutPct}%`;
    document.getElementById('dash-workout-status').innerText = `${completedCount} of ${AppState.workout.length} completed`;
    
    if (completedCount === AppState.workout.length && AppState.workout.length > 0) {
        document.getElementById('dash-workout-name').innerText = "Workout Complete! 🎉";
    } else {
        const activeWorkoutName = AppState.workout.length > 0 ? AppState.workout[0].name : "Rest Day";
        document.getElementById('dash-workout-name').innerText = activeWorkoutName;
    }
    
    // Daily food cost estimation
    let totalGroceryCost = 0;
    AppState.groceryList.forEach(g => {
        totalGroceryCost += g.cost;
    });
    // Divided into daily average (standard 7 day calculation)
    const dailyEstCost = Math.round(totalGroceryCost / 7);
    document.getElementById('dash-budget-value').innerText = `₹${dailyEstCost} / day`;
    
    // Schedule timelines
    const breakfast = AppState.meals.find(m => m.type === "Breakfast");
    const lunch = AppState.meals.find(m => m.type === "Lunch");
    const dinner = AppState.meals.find(m => m.type === "Dinner");
    
    if (breakfast) {
        document.getElementById('dash-breakfast-desc').innerText = breakfast.title;
        document.getElementById('dash-sched-breakfast').className = `timeline-content card-interactive ${breakfast.completed ? 'completed-box' : ''}`;
    }
    if (lunch) {
        document.getElementById('dash-lunch-desc').innerText = lunch.title;
        document.getElementById('dash-sched-lunch').className = `timeline-content card-interactive ${lunch.completed ? 'completed-box' : ''}`;
    }
    if (dinner) {
        document.getElementById('dash-dinner-desc').innerText = dinner.title;
        document.getElementById('dash-sched-dinner').className = `timeline-content card-interactive ${dinner.completed ? 'completed-box' : ''}`;
    }
    
    // Workout overview schedule
    if (AppState.workout.length > 0) {
        const completeEx = AppState.workout.filter(e => e.completed).length;
        document.getElementById('dash-workout-desc').innerText = `${AppState.workout[0].name} + ${AppState.workout.length - 1} more exercises (${completeEx}/${AppState.workout.length})`;
        const workoutFinished = (completeEx === AppState.workout.length);
        document.getElementById('dash-sched-workout').className = `timeline-content card-interactive highlight-border ${workoutFinished ? 'completed-box' : ''}`;
    } else {
        document.getElementById('dash-workout-desc').innerText = "Rest and recover!";
    }
    
    // Sync water display
    syncWaterCups();
}

function syncWaterCups() {
    document.getElementById('hydration-count').innerText = `${AppState.waterIntake} / 8 Glasses`;
    const cups = document.querySelectorAll('#cups-container .cup-btn');
    cups.forEach((cup, idx) => {
        if (idx < AppState.waterIntake) {
            cup.classList.add('filled');
        } else {
            cup.classList.remove('filled');
        }
    });
}

function renderWorkoutTab() {
    const listContainer = document.getElementById('exercises-list');
    listContainer.innerHTML = "";
    
    let goalText = "Hostel Calisthenics";
    if (AppState.profile.equipment === 'full-gym') goalText = "Full Gym Access";
    else if (AppState.profile.equipment === 'dumbbells') goalText = "Dumbbells Workout";
    else if (AppState.profile.equipment === 'bands') goalText = "Resistance Bands Routine";
    
    document.getElementById('workout-routine-subtitle').innerText = `${goalText} — ${AppState.profile.time} Session`;
    
    const completedCount = AppState.workout.filter(ex => ex.completed).length;
    document.getElementById('workout-progress-badge').innerText = `${completedCount} / ${AppState.workout.length} Done`;
    
    AppState.workout.forEach((ex, index) => {
        const item = document.createElement('div');
        item.className = `exercise-item ${ex.completed ? 'completed-box' : ''}`;
        item.innerHTML = `
            <div class="exercise-checkbox-wrapper">
                <input type="checkbox" class="exercise-checkbox" data-index="${index}" ${ex.completed ? 'checked' : ''}>
            </div>
            <div class="exercise-details">
                <h4 style="${ex.completed ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${ex.name}</h4>
                <p>${ex.reps} • Target: ${ex.target}</p>
            </div>
            <button class="exercise-action-btn btn-view-instructions" data-index="${index}" title="Show Guide"><i data-lucide="info"></i></button>
        `;
        listContainer.appendChild(item);
    });
    
    lucide.createIcons();
    
    // Add event listeners to exercise checkboxes
    const checkboxes = listContainer.querySelectorAll('.exercise-checkbox');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            const idx = parseInt(e.target.getAttribute('data-index'));
            AppState.workout[idx].completed = e.target.checked;
            
            // Auto voice response on checking
            if (e.target.checked && AppState.voiceGuidance) {
                speakCoach(`Awesome work on completing ${AppState.workout[idx].name}!`);
            }
            
            saveState();
            renderWorkoutTab();
            syncDashboardMetrics();
        });
    });
    
    // Info button listeners
    const infoBtns = listContainer.querySelectorAll('.btn-view-instructions');
    infoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.currentTarget.getAttribute('data-index'));
            const ex = AppState.workout[idx];
            document.getElementById('guide-exercise-title').innerText = ex.name;
            document.getElementById('guide-exercise-text').innerText = `Target: ${ex.target}. Keep proper form throughout the movement. Complete ${ex.reps}. Breathe steadily.`;
            showToast(`Loaded details for ${ex.name}`, 'info');
        });
    });
}

function renderDietTab() {
    const targets = calculateNutrientTargets();
    document.getElementById('nutrition-total-cals').innerText = targets.calories;
    
    // Calculate consumed
    let c = 0, p = 0, carbs = 0, f = 0;
    AppState.meals.forEach(m => {
        if (m.completed) {
            c += m.cals;
            p += m.protein;
            carbs += m.carbs;
            f += m.fats;
        }
    });
    
    document.getElementById('diet-protein-val').innerText = `${p}g`;
    document.getElementById('diet-carbs-val').innerText = `${carbs}g`;
    document.getElementById('diet-fats-val').innerText = `${f}g`;
    
    document.getElementById('diet-protein-target-lbl').innerText = `of ${targets.protein}g`;
    document.getElementById('diet-carbs-target-lbl').innerText = `of ${targets.carbs}g`;
    document.getElementById('diet-fats-target-lbl').innerText = `of ${targets.fats}g`;
    
    // Sync SVG arcs
    const pPct = Math.min(p / targets.protein, 1);
    const cPct = Math.min(carbs / targets.carbs, 1);
    const fPct = Math.min(f / targets.fats, 1);
    
    // Circumference is 251.2
    document.getElementById('macro-protein-arc').style.strokeDashoffset = 251.2 - (251.2 * pPct);
    document.getElementById('macro-carbs-arc').style.strokeDashoffset = 251.2 - (251.2 * cPct);
    document.getElementById('macro-fats-arc').style.strokeDashoffset = 251.2 - (251.2 * fPct);
    
    // Populate Meals List
    const mealsContainer = document.getElementById('meals-list-container');
    mealsContainer.innerHTML = "";
    
    AppState.meals.forEach((meal, index) => {
        const card = document.createElement('div');
        card.className = `meal-item glass ${meal.completed ? 'completed-box' : ''}`;
        card.innerHTML = `
            <div class="meal-header">
                <span class="meal-type">${meal.type}</span>
                <div class="meal-macros">${meal.cals} kcal • ${meal.protein}g Protein</div>
            </div>
            <h4 class="meal-title" style="${meal.completed ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${meal.title}</h4>
            <p class="meal-ingredients"><strong>Ingredients:</strong> ${meal.ingredients}</p>
            <div class="meal-cooking-tips">
                <strong><i data-lucide="cooking-pot" class="inline-icon"></i> AI Instructions:</strong> ${meal.prep}
            </div>
            <div class="meal-footer">
                <button class="accent-btn btn-sm btn-log-meal-toggle" data-index="${index}">${meal.completed ? 'Logged ✓' : 'Log Meal'}</button>
                <button class="secondary-btn btn-sm btn-swap-meal-row" data-index="${index}"><i data-lucide="refresh-cw"></i> Swap</button>
            </div>
        `;
        mealsContainer.appendChild(card);
    });
    
    lucide.createIcons();
    
    // Add Meal Logs Events
    mealsContainer.querySelectorAll('.btn-log-meal-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.target.getAttribute('data-index'));
            AppState.meals[idx].completed = !AppState.meals[idx].completed;
            saveState();
            renderDietTab();
            syncDashboardMetrics();
            showToast(`${AppState.meals[idx].title} status updated!`);
        });
    });
    
    // Single Meal Swap Trigger
    mealsContainer.querySelectorAll('.btn-swap-meal-row').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.currentTarget.getAttribute('data-index'));
            triggerSingleMealSwap(idx);
        });
    });
    
    // Populate Groceries Checklist
    const groceryContainer = document.getElementById('grocery-checklist');
    groceryContainer.innerHTML = "";
    
    let totalEstCost = 0;
    AppState.groceryList.forEach((item, index) => {
        totalEstCost += item.cost;
        const div = document.createElement('div');
        div.className = "grocery-item";
        div.innerHTML = `
            <div class="grocery-left">
                <input type="checkbox" class="grocery-checkbox" id="g-item-${index}" data-index="${index}" ${item.checked ? 'checked' : ''}>
                <label for="g-item-${index}">${item.name}</label>
            </div>
            <span class="grocery-price">₹${item.cost}</span>
        `;
        groceryContainer.appendChild(div);
    });
    
    document.getElementById('grocery-cost-badge').innerText = `Est Weekly Total: ₹${totalEstCost}`;
    
    // Grocery checks
    groceryContainer.querySelectorAll('.grocery-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const idx = parseInt(e.target.getAttribute('data-index'));
            AppState.groceryList[idx].checked = e.target.checked;
            saveState();
        });
    });
    
    // Budget Swaps Logic dynamically loaded
    renderBudgetSwaps();
}

function renderBudgetSwaps() {
    const budgetSwapsBox = document.getElementById('budget-swaps-box');
    budgetSwapsBox.innerHTML = "";
    
    let swapHtml = "";
    if (AppState.profile.cuisine.includes('indian')) {
        swapHtml = `
            <div class="swap-comparison">
                <div class="original-item">
                    <span class="lbl-small red-text">Expensive Alternative</span>
                    <strong>Paneer (Premium Brand)</strong>
                    <span class="price-desc">₹180 per 200g (36g protein)</span>
                </div>
                <div class="swap-arrow"><i data-lucide="arrow-right"></i></div>
                <div class="swapped-item">
                    <span class="lbl-small green-text">AI Budget Swap</span>
                    <strong>Dried Soy Chunks or Eggs</strong>
                    <span class="price-desc">₹30 per 100g chunk (52g protein) / ₹42 for 6 eggs (36g protein)</span>
                </div>
            </div>
        `;
    } else {
        swapHtml = `
            <div class="swap-comparison">
                <div class="original-item">
                    <span class="lbl-small red-text">Expensive Alternative</span>
                    <strong>Fresh Salmon fillet</strong>
                    <span class="price-desc">₹450 per serving (approx. 30g protein)</span>
                </div>
                <div class="swap-arrow"><i data-lucide="arrow-right"></i></div>
                <div class="swapped-item">
                    <span class="lbl-small green-text">AI Budget Swap</span>
                    <strong>Canned Tuna (Chunk Light)</strong>
                    <span class="price-desc">₹90 per can (approx. 28g protein)</span>
                </div>
            </div>
        `;
    }
    
    budgetSwapsBox.innerHTML = swapHtml;
    lucide.createIcons();
}

function triggerSingleMealSwap(idx) {
    const types = ["High Protein Tofu Wrap", "Lentil Pasta Salad", "Boiled Egg Mash & Toast", "Soya Nuggets dry-stir", "Oats Savoury Pancake"];
    const randomIndex = Math.floor(Math.random() * types.length);
    const newTitle = types[randomIndex];
    
    AppState.meals[idx].title = newTitle;
    AppState.meals[idx].ingredients = "AI Swapped: High quality base proteins, local greens, light dressing.";
    AppState.meals[idx].prep = "Ready in 10 mins using your " + AppState.profile.kitchen + " configuration. Season with salt, lemon, and pepper.";
    AppState.meals[idx].cals = Math.round(AppState.meals[idx].cals * 0.95);
    
    // Add corresponding item to grocery
    const groceryName = `${newTitle.split(" ")[0]} ingredients (Custom Swap)`;
    AppState.groceryList.push({ name: groceryName, cost: 80, category: "Mixed", checked: false });
    
    saveState();
    renderDietTab();
    syncDashboardMetrics();
    showToast(`Meal swapped successfully!`, 'info');
}

// ----------------------------------------------------
// AI Chat Coach Logic
// ----------------------------------------------------
function speakCoach(messageText) {
    if (!('speechSynthesis' in window)) return;
    
    // Cancel active speaks
    window.speechSynthesis.cancel();
    
    // Clean tags or brackets from read text
    const textToSpeak = messageText.replace(/<\/?[^>]+(>|$)/g, "").replace(/\*+/g, "");
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Pick suitable voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang.includes('en') && voice.name.toLowerCase().includes('google'));
    if (englishVoice) {
        utterance.voice = englishVoice;
    }
    
    window.speechSynthesis.speak(utterance);
}

function processAIChatMessage(messageText) {
    let responseText = "";
    const lower = messageText.toLowerCase();
    
    // Match logic
    if (lower.includes('swap') || lower.includes('substitute') || lower.includes('cheaper') || lower.includes('cheap')) {
        responseText = "Based on your student budget tier, I have updated your meals with a high-efficiency alternative. For breakfast, you can drink <strong>Sattu Powder Water (1 glass)</strong> and a banana instead. It cuts your cost by ₹30 and adds 12g protein. Would you like me to make this permanent?";
        // Actually perform a client state update
        if (AppState.meals.length > 0) {
            AppState.meals[0].title = "Sattu Shake & Banana (AI Chat Swap)";
            AppState.meals[0].ingredients = "Sattu (roasted gram flour) 40g, water, lemon, 1 banana";
            AppState.meals[0].cals = 320;
            AppState.meals[0].protein = 12;
            saveState();
            renderDietTab();
            syncDashboardMetrics();
        }
    } else if (lower.includes('workout') || lower.includes('time') || lower.includes('short') || lower.includes('minute') || lower.includes('lazy')) {
        responseText = "No problem! I have truncated today's workout to an <strong>Express 15-Minute Circuit</strong> so you can study for exams. Squeeze in: 3 sets of Bodyweight squats (12 reps), Pushups (10 reps), and a 45s Plank. Total active time: 12 minutes! Check your Workout tab.";
        
        // Truncate workout
        AppState.workout = [
            { name: "Jumping Jacks (Warm up)", reps: "45s work", target: "Cardio", completed: false },
            { name: "Bodyweight Squats (Dorm room)", reps: "3 sets x 12 reps", target: "Quads", completed: false },
            { name: "Hostel Floor Pushups", reps: "3 sets x 10 reps", target: "Chest", completed: false },
            { name: "Plank Hold", reps: "3 sets x 45s", target: "Core", completed: false }
        ];
        saveState();
        renderWorkoutTab();
        syncDashboardMetrics();
    } else if (lower.includes('microwave') || lower.includes('kettle')) {
        responseText = "Hostel hacks! You can cook oatmeal, scramble eggs in a mug (90 seconds, beat eggs with chopped veggies), or steam sweet potatoes (pierce with fork, cover in damp paper towel, microwave 4 minutes). I've marked your prep instructions with microwave guidelines!";
        AppState.profile.kitchen = "microwave-only";
        saveState();
        runAIGenerator();
        renderDietTab();
        syncDashboardMetrics();
    } else if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
        responseText = `Hey ${AppState.profile.name}! Ready to hit your goals today? Your calorie goal is ${calculateNutrientTargets().calories} kcal. Let me know if you need to optimize your grocery list or modify your workouts.`;
    } else {
        responseText = "Understood. I will run a customized heuristic model based on your student profile. I've adjusted your macronutrient targets slightly for better satiety during desk study. Ask me if you need specific ingredient hacks!";
    }
    
    // Add messages to state
    AppState.chatHistory.push({ sender: 'user', text: messageText });
    AppState.chatHistory.push({ sender: 'coach', text: responseText });
    saveState();
    
    // Render
    renderChatThread();
    
    // Speech synthesis trigger
    if (AppState.voiceGuidance) {
        speakCoach(responseText);
    }
}

function renderChatThread() {
    const container = document.getElementById('chat-thread-messages');
    const miniContainer = document.getElementById('mini-chat-display');
    
    // Clear lists but keep original welcome message
    container.innerHTML = `
        <div class="chat-message coach-message">
            <strong>Coach AuraFit:</strong><br>
            Welcome to your AI coaching terminal, ${AppState.profile.name}! I have access to your active profile constraints:
            <ul style="margin: 8px 0 0 16px; padding: 0;">
                <li>Budget Level: <strong id="chat-status-budget">${AppState.profile.budget === 'budget-tight' ? 'Ultra Saver' : AppState.profile.budget === 'budget-moderate' ? 'Moderate' : 'Flexible'}</strong></li>
                <li>Equipment available: <strong id="chat-status-equipment">${AppState.profile.equipment === 'full-gym' ? 'Full Gym Access' : AppState.profile.equipment === 'dumbbells' ? 'Dumbbells Only' : 'Bodyweight Only'}</strong></li>
                <li>Kitchen equipment: <strong id="chat-status-kitchen">${AppState.profile.kitchen === 'microwave-only' ? 'Microwave/Kettle Only' : AppState.profile.kitchen === 'shared-kitchen' ? 'Induction Cooktop' : 'Full Kitchen'}</strong></li>
            </ul>
            Tell me how I can adapt your workouts, meals, or grocery runs today!
        </div>
    `;
    miniContainer.innerHTML = "";
    
    AppState.chatHistory.forEach(msg => {
        const div = document.createElement('div');
        div.className = `chat-message ${msg.sender === 'user' ? 'user-message' : 'coach-message'}`;
        div.innerHTML = msg.text;
        
        // Add to main thread
        container.appendChild(div);
        
        // Add to mini dashboard chat
        const miniDiv = div.cloneNode(true);
        miniContainer.appendChild(miniDiv);
    });
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
    miniContainer.scrollTop = miniContainer.scrollHeight;
    
    // Sync chat status labels
    document.getElementById('chat-status-budget').innerText = AppState.profile.budget === 'budget-tight' ? 'Ultra Saver' : AppState.profile.budget === 'budget-moderate' ? 'Moderate' : 'Flexible';
    document.getElementById('chat-status-equipment').innerText = AppState.profile.equipment === 'full-gym' ? 'Full Gym Access' : AppState.profile.equipment === 'dumbbells' ? 'Dumbbells Only' : 'Bodyweight Only';
    document.getElementById('chat-status-kitchen').innerText = AppState.profile.kitchen === 'microwave-only' ? 'Microwave/Kettle Only' : AppState.profile.kitchen === 'shared-kitchen' ? 'Induction Cooktop' : 'Full Kitchen';
}

// ----------------------------------------------------
// Countdown Timer Module
// ----------------------------------------------------
let timerInterval = null;
let timerSecondsTotal = 45; // default rest
let timerSecondsRemaining = 45;
let timerIsRunning = false;
let currentTimerMode = "REST"; // OR "WORK"

function initTimer() {
    updateTimerDisplay();
    
    const playBtn = document.getElementById('btn-timer-play');
    const resetBtn = document.getElementById('btn-timer-reset');
    const skipBtn = document.getElementById('btn-timer-skip');
    
    playBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);
    skipBtn.addEventListener('click', skipTimer);
}

function updateTimerDisplay() {
    const mins = Math.floor(timerSecondsRemaining / 60);
    const secs = timerSecondsRemaining % 60;
    document.getElementById('timer-time-display').innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    document.getElementById('timer-label-display').innerText = `${currentTimerMode} SECONDS`;
    
    // Circle offset calculations
    // Circumference = 502
    const pct = timerSecondsRemaining / timerSecondsTotal;
    const offset = 502 - (502 * pct);
    const circleFill = document.getElementById('timer-arc');
    circleFill.style.strokeDashoffset = offset;
    
    // Color coded states
    if (currentTimerMode === "REST") {
        circleFill.style.stroke = "var(--accent-green)";
    } else {
        circleFill.style.stroke = "var(--accent-purple)";
    }
}

function toggleTimer() {
    const icon = document.getElementById('play-icon');
    
    if (timerIsRunning) {
        // Pause
        clearInterval(timerInterval);
        timerIsRunning = false;
        icon.setAttribute('data-lucide', 'play');
        showToast("Timer paused", 'info');
    } else {
        // Play
        timerIsRunning = true;
        icon.setAttribute('data-lucide', 'pause');
        showToast(`Timer started (${currentTimerMode} block)`, 'info');
        
        timerInterval = setInterval(() => {
            if (timerSecondsRemaining > 0) {
                timerSecondsRemaining--;
                updateTimerDisplay();
                
                // Voice count-down last 3 seconds
                if (timerSecondsRemaining <= 3 && timerSecondsRemaining > 0 && AppState.voiceGuidance) {
                    speakCoach(timerSecondsRemaining.toString());
                }
            } else {
                clearInterval(timerInterval);
                timerIsRunning = false;
                icon.setAttribute('data-lucide', 'play');
                timerFinished();
            }
        }, 1000);
    }
    lucide.createIcons();
}

function resetTimer() {
    clearInterval(timerInterval);
    timerIsRunning = false;
    timerSecondsRemaining = timerSecondsTotal;
    document.getElementById('play-icon').setAttribute('data-lucide', 'play');
    updateTimerDisplay();
    lucide.createIcons();
    showToast("Timer reset", 'info');
}

function skipTimer() {
    clearInterval(timerInterval);
    timerIsRunning = false;
    timerSecondsRemaining = 0;
    document.getElementById('play-icon').setAttribute('data-lucide', 'play');
    updateTimerDisplay();
    lucide.createIcons();
    timerFinished();
}

function timerFinished() {
    // Toggle block
    if (currentTimerMode === "REST") {
        currentTimerMode = "WORK";
        timerSecondsTotal = 60; // 1 min work block
        timerSecondsRemaining = 60;
        showToast("Rest over! Get to work!", 'success');
        if (AppState.voiceGuidance) {
            speakCoach("Rest finished. Begin your set now.");
        }
    } else {
        currentTimerMode = "REST";
        timerSecondsTotal = 45; // 45s rest block
        timerSecondsRemaining = 45;
        showToast("Set complete! Rest now.", 'success');
        if (AppState.voiceGuidance) {
            speakCoach("Set complete. Start your rest period.");
        }
    }
    updateTimerDisplay();
}

// ----------------------------------------------------
// Graphs & Analytics Charts
// ----------------------------------------------------
let calorieChartInstance = null;
let savingsChartInstance = null;

function renderCharts() {
    const calCtx = document.getElementById('caloriesChart').getContext('2d');
    const saveCtx = document.getElementById('savingsChart').getContext('2d');
    
    // Destroy existing instances to prevent overlays
    if (calorieChartInstance) calorieChartInstance.destroy();
    if (savingsChartInstance) savingsChartInstance.destroy();
    
    // Chart 1: Calories Consumed vs Burned
    const activeStreak = AppState.activeStreak || 3;
    calorieChartInstance = new Chart(calCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Consumed (kcal)',
                    data: [1850, 2100, 2050, 1900, 2200, 2150, 0], // today is Sunday, no meals logged yet
                    backgroundColor: 'rgba(158, 0, 255, 0.6)',
                    borderColor: 'var(--accent-purple)',
                    borderWidth: 1,
                    borderRadius: 5
                },
                {
                    label: 'Target (kcal)',
                    data: Array(7).fill(calculateNutrientTargets().calories),
                    type: 'line',
                    borderColor: 'rgba(0, 136, 255, 0.8)',
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: 'var(--text-secondary)' } }
            },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'var(--text-muted)' } },
                x: { grid: { display: false }, ticks: { color: 'var(--text-muted)' } }
            }
        }
    });
    
    // Chart 2: Estimated Savings Tracker
    // Calculations: Standard meal kit/commercial diet plans = ₹350/day. AuraFit Student AI plan = ₹120/day
    // Savings = ₹230 / day aggregated over a week.
    savingsChartInstance = new Chart(saveCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'AuraFit AI Savings (₹)',
                data: [1610, 3220, 4830, 6440],
                borderColor: 'var(--accent-green)',
                backgroundColor: 'rgba(0, 229, 117, 0.1)',
                fill: true,
                tension: 0.3,
                pointBackgroundColor: 'var(--accent-green)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: 'var(--text-secondary)' } }
            },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'var(--text-muted)' } },
                x: { grid: { display: false }, ticks: { color: 'var(--text-muted)' } }
            }
        }
    });
}

// ----------------------------------------------------
// Form Handling & Initializers
// ----------------------------------------------------
function handleOnboardingSubmit(e) {
    e.preventDefault();
    
    const loader = document.getElementById('app-loader');
    const loaderTitle = document.getElementById('loader-title');
    loader.classList.remove('hidden');
    
    loaderTitle.innerText = "Analyzing Student Profile...";
    
    // Gather inputs
    AppState.profile.name = document.getElementById('input-name').value;
    AppState.profile.gender = document.getElementById('select-gender').value;
    AppState.profile.age = parseInt(document.getElementById('input-age').value);
    AppState.profile.weight = parseFloat(document.getElementById('input-weight').value);
    AppState.profile.height = parseFloat(document.getElementById('input-height').value);
    AppState.profile.goal = document.getElementById('select-goal').value;
    AppState.profile.budget = document.getElementById('select-budget').value;
    AppState.profile.equipment = document.getElementById('select-equipment').value;
    AppState.profile.kitchen = document.getElementById('select-kitchen').value;
    AppState.profile.time = document.getElementById('select-time').value;
    AppState.profile.cuisine = document.getElementById('select-cuisine').value;
    AppState.profile.allergies = document.getElementById('input-allergies').value;
    AppState.profile.activity = document.getElementById('select-activity').value;
    
    setTimeout(() => {
        loaderTitle.innerText = "Generating Cost-Optimized Recipes...";
        setTimeout(() => {
            loaderTitle.innerText = "Adapting Exercises to Available Gear...";
            setTimeout(() => {
                // Compile plans
                runAIGenerator();
                
                AppState.onboarded = true;
                saveState();
                
                // Render UI
                syncUserProfileDisplay();
                syncDashboardMetrics();
                renderWorkoutTab();
                renderDietTab();
                renderChatThread();
                
                // Hide loader and switch to dashboard
                loader.classList.add('hidden');
                switchTab('dashboard');
                showToast("Your Personalized AI Plan is ready! 🎉", "success");
                
                if (AppState.voiceGuidance) {
                    speakCoach(`Welcome back, ${AppState.profile.name}! I have generated your customized budget plan.`);
                }
            }, 1000);
        }, 1000);
    }, 1000);
}

function handleOnboardingNavs() {
    // Next buttons
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', () => {
            const form = document.getElementById('onboarding-form');
            // Check validity of fields inside the current block before going next
            const activeStepEl = document.querySelector('.form-step.active');
            const inputs = activeStepEl.querySelectorAll('input[required]');
            let valid = true;
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity();
                    valid = false;
                }
            });
            if (valid) {
                setOnboardingStep(currentStep + 1);
            }
        });
    });
    
    // Back buttons
    document.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', () => {
            setOnboardingStep(currentStep - 1);
        });
    });
}

function initEventHandlers() {
    // Sidebar Tabs navigation
    NavButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.getAttribute('data-tab'));
        });
    });
    
    // Dashboard redirection buttons
    document.getElementById('btn-view-workout-tab').addEventListener('click', () => switchTab('workout'));
    document.getElementById('btn-view-chat-tab').addEventListener('click', () => switchTab('chat'));
    document.getElementById('btn-re-profile').addEventListener('click', () => {
        // Clear onboarding state and toggle wizard
        AppState.onboarded = false;
        saveState();
        setOnboardingStep(1);
        switchTab('onboarding');
    });
    
    // Onboarding Form
    document.getElementById('onboarding-form').addEventListener('submit', handleOnboardingSubmit);
    
    // AI Re-Plan quick action
    document.getElementById('btn-quick-generate').addEventListener('click', () => {
        const loader = document.getElementById('app-loader');
        loader.classList.remove('hidden');
        document.getElementById('loader-title').innerText = "Recalculating AI targets...";
        setTimeout(() => {
            runAIGenerator();
            syncDashboardMetrics();
            renderWorkoutTab();
            renderDietTab();
            renderChatThread();
            loader.classList.add('hidden');
            showToast("AI Workout & Diet routines refreshed!", "success");
        }, 1500);
    });
    
    // Hydration add/reset
    document.getElementById('btn-add-water').addEventListener('click', () => {
        if (AppState.waterIntake < 8) {
            AppState.waterIntake++;
            saveState();
            syncWaterCups();
            showToast("Water cup logged! Keep hydrating. 💧", "info");
        } else {
            showToast("Excellent! You've met your water goal today. 🌟", "success");
        }
    });
    
    document.getElementById('btn-reset-water').addEventListener('click', () => {
        AppState.waterIntake = 0;
        saveState();
        syncWaterCups();
        showToast("Water log reset.", "info");
    });
    
    // Add cup clicks
    document.querySelectorAll('#cups-container .cup-btn').forEach((cup, idx) => {
        cup.addEventListener('click', () => {
            AppState.waterIntake = idx + 1;
            saveState();
            syncWaterCups();
            showToast(`Water logged: ${AppState.waterIntake} glasses`, "info");
        });
    });
    
    // Mini Chat Box send
    document.getElementById('btn-mini-chat-send').addEventListener('click', () => {
        const input = document.getElementById('mini-chat-input');
        if (input.value.trim() !== "") {
            processAIChatMessage(input.value.trim());
            input.value = "";
        }
    });
    
    document.getElementById('mini-chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const input = document.getElementById('mini-chat-input');
            if (input.value.trim() !== "") {
                processAIChatMessage(input.value.trim());
                input.value = "";
            }
        }
    });
    
    // Full Thread Chat Box send
    document.getElementById('btn-chat-thread-send').addEventListener('click', () => {
        const input = document.getElementById('chat-thread-input');
        if (input.value.trim() !== "") {
            processAIChatMessage(input.value.trim());
            input.value = "";
        }
    });
    
    document.getElementById('chat-thread-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const input = document.getElementById('chat-thread-input');
            if (input.value.trim() !== "") {
                processAIChatMessage(input.value.trim());
                input.value = "";
            }
        }
    });
    
    // Clear Chat history
    document.getElementById('btn-clear-chat').addEventListener('click', () => {
        AppState.chatHistory = [];
        saveState();
        renderChatThread();
        showToast("Chat history cleared.", "info");
    });
    
    // Chat shortcuts
    document.querySelectorAll('.shortcut-btn-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = e.currentTarget.getAttribute('data-prompt');
            processAIChatMessage(text);
        });
    });
    
    // Toggle Voice Guidance
    document.getElementById('btn-toggle-voice').addEventListener('click', () => {
        AppState.voiceGuidance = !AppState.voiceGuidance;
        const icon = document.getElementById('voice-icon');
        icon.setAttribute('data-lucide', AppState.voiceGuidance ? 'volume-2' : 'volume-x');
        lucide.createIcons();
        saveState();
        showToast(`Voice assistant ${AppState.voiceGuidance ? 'enabled' : 'disabled'}`, 'info');
    });
    
    // Add custom grocery item
    document.getElementById('btn-add-grocery-item').addEventListener('click', () => {
        const name = prompt("Enter grocery item name:");
        if (name && name.trim()) {
            const price = parseInt(prompt("Enter price (₹):") || "50");
            AppState.groceryList.push({
                name: name.trim(),
                cost: isNaN(price) ? 50 : price,
                category: "Custom",
                checked: false
            });
            saveState();
            renderDietTab();
            syncDashboardMetrics();
            showToast(`Added ${name} to grocery list`);
        }
    });
    
    // Reset meals
    document.getElementById('btn-reset-meals').addEventListener('click', () => {
        AppState.meals.forEach(m => m.completed = false);
        saveState();
        renderDietTab();
        syncDashboardMetrics();
        showToast("Logged meals reset.", "info");
    });
    
    // Stats Logging Form
    document.getElementById('stats-log-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const weight = parseFloat(document.getElementById('stat-weight').value);
        const water = parseInt(document.getElementById('stat-water').value);
        const extraCals = parseInt(document.getElementById('stat-calories').value);
        
        // Log weight and update state
        AppState.profile.weight = weight;
        AppState.waterIntake = Math.max(AppState.waterIntake, water);
        
        if (extraCals > 0) {
            showToast(`Logged additional ${extraCals} kcal!`, 'success');
        }
        
        // Update milestone streak check
        AppState.activeStreak = (AppState.activeStreak || 0) + 1;
        document.getElementById('milestone-workout-streak').innerText = AppState.activeStreak;
        
        // Check milestone complete
        if (AppState.activeStreak >= 3) {
            document.getElementById('milestone-workouts').classList.add('achieved');
            document.querySelector('#milestone-workouts .milestone-icon').innerHTML = '<i data-lucide="check-circle-2"></i>';
        }
        
        saveState();
        syncUserProfileDisplay();
        syncDashboardMetrics();
        renderDietTab();
        renderCharts();
        
        lucide.createIcons();
        showToast("Stats logged successfully!", "success");
    });
}

// ----------------------------------------------------
// Entrypoint Initialization
// ----------------------------------------------------
window.addEventListener('DOMContentLoaded', async () => {
    // Load state from backend
    await loadState();
    
    // Init speech support voices load
    if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
    }
    
    // Set up step handlers
    handleOnboardingNavs();
    
    // Set up event clickers
    initEventHandlers();
    
    // Initialize timer
    initTimer();
    
    // Redirect logic
    if (AppState.onboarded) {
        // Compile plans if empty (safe check)
        if (AppState.meals.length === 0 || AppState.workout.length === 0) {
            runAIGenerator();
        }
        
        syncUserProfileDisplay();
        syncDashboardMetrics();
        renderWorkoutTab();
        renderDietTab();
        renderChatThread();
        
        switchTab('dashboard');
    } else {
        // Start wizard
        setOnboardingStep(1);
        switchTab('onboarding');
    }
    
    // Force draw SVGs and icons
    lucide.createIcons();
});

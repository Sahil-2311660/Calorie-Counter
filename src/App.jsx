
import { useMemo, useState } from "react";
import "./App.css";

const foods = [

  // VEGETABLES
  { name: "Carrot (raw)", calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2 },
  { name: "Cucumber", calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1 },
  { name: "Tomato", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  { name: "Onion", calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1 },
  { name: "Spinach (raw)", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  { name: "Cauliflower", calories: 25, protein: 1.9, carbs: 5.0, fat: 0.3 },
  { name: "Cabbage", calories: 25, protein: 1.3, carbs: 5.8, fat: 0.1 },
  { name: "Broccoli", calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4 },
  { name: "Capsicum", calories: 20, protein: 0.9, carbs: 4.6, fat: 0.2 },
  { name: "Brinjal (eggplant)", calories: 25, protein: 1.0, carbs: 6.0, fat: 0.2 },
  { name: "Green peas", calories: 81, protein: 5.4, carbs: 14.5, fat: 0.4 },
  { name: "Green beans", calories: 31, protein: 1.8, carbs: 7.0, fat: 0.1 },
  { name: "Ladyfinger (okra)", calories: 33, protein: 1.9, carbs: 7.5, fat: 0.2 },
  { name: "Sweet potato (raw)", calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1 },
  { name: "Pumpkin", calories: 26, protein: 1.0, carbs: 6.5, fat: 0.1 },
  { name: "Radish", calories: 16, protein: 0.7, carbs: 3.4, fat: 0.1 },
  { name: "Beetroot", calories: 43, protein: 1.6, carbs: 9.6, fat: 0.2 },
  { name: "Mushroom", calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3 },
  { name: "Bitter gourd (karela)", calories: 17, protein: 1.0, carbs: 3.7, fat: 0.2 },
  { name: "Bottle gourd (lauki)", calories: 14, protein: 0.6, carbs: 3.4, fat: 0.0 },
  { name: "Drumstick pods", calories: 37, protein: 2.1, carbs: 8.5, fat: 0.2 },

  // FRUITS
  { name: "Apple", calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2 },
  { name: "Orange", calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1 },
  { name: "Mango", calories: 60, protein: 0.8, carbs: 15.0, fat: 0.4 },
  { name: "Grapes", calories: 69, protein: 0.7, carbs: 18.1, fat: 0.2 },
  { name: "Papaya", calories: 43, protein: 0.5, carbs: 10.8, fat: 0.3 },
  { name: "Guava", calories: 68, protein: 2.6, carbs: 14.3, fat: 1.0 },
  { name: "Watermelon", calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2 },
  { name: "Pineapple", calories: 50, protein: 0.5, carbs: 13.1, fat: 0.1 },
  { name: "Pomegranate", calories: 83, protein: 1.7, carbs: 18.7, fat: 1.2 },
  { name: "Strawberry", calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3 },
  { name: "Pear", calories: 57, protein: 0.4, carbs: 15.2, fat: 0.1 },
  { name: "Kiwi", calories: 61, protein: 1.1, carbs: 14.7, fat: 0.5 },
  { name: "Avocado", calories: 160, protein: 2.0, carbs: 8.5, fat: 14.7 },
  { name: "Sweet lime (mosambi)", calories: 43, protein: 0.8, carbs: 9.3, fat: 0.3 },
  { name: "Chikoo (sapodilla)", calories: 83, protein: 0.4, carbs: 19.9, fat: 1.1 },
  { name: "Jackfruit", calories: 95, protein: 1.7, carbs: 23.3, fat: 0.6 },

  // DRY FRUITS
  { name: "Almonds", calories: 579, protein: 21.2, carbs: 21.6, fat: 49.9 },
  { name: "Cashews", calories: 553, protein: 18.2, carbs: 30.2, fat: 43.9 },
  { name: "Walnuts", calories: 654, protein: 15.2, carbs: 13.7, fat: 65.2 },
  { name: "Pistachios", calories: 562, protein: 20.2, carbs: 27.5, fat: 45.3 },
  { name: "Raisins", calories: 299, protein: 3.1, carbs: 79.2, fat: 0.5 },
  { name: "Dates (dried)", calories: 282, protein: 2.5, carbs: 75.0, fat: 0.4 },
  { name: "Dried figs", calories: 249, protein: 3.3, carbs: 63.9, fat: 0.9 },
  { name: "Dried apricots", calories: 241, protein: 3.4, carbs: 62.6, fat: 0.5 },
  { name: "Peanuts", calories: 567, protein: 25.8, carbs: 16.1, fat: 49.2 },
  { name: "Desiccated coconut", calories: 660, protein: 6.9, carbs: 23.7, fat: 64.5 },

  // SEEDS
  { name: "Chia seeds", calories: 486, protein: 16.5, carbs: 42.1, fat: 30.7 },
  { name: "Flax seeds", calories: 534, protein: 18.3, carbs: 28.9, fat: 42.2 },
  { name: "Pumpkin seeds", calories: 559, protein: 30.2, carbs: 10.7, fat: 49.1 },
  { name: "Sunflower seeds", calories: 584, protein: 20.8, carbs: 20.0, fat: 51.5 },
  { name: "Sesame seeds (til)", calories: 573, protein: 17.7, carbs: 23.4, fat: 49.7 },

  // GRAINS AND CEREALS
  { name: "Whole wheat flour (atta)", calories: 340, protein: 13.2, carbs: 72.0, fat: 2.5 },
  { name: "Besan (gram flour)", calories: 387, protein: 22.4, carbs: 57.8, fat: 6.7 },
  { name: "Poha (dry)", calories: 350, protein: 6.7, carbs: 77.0, fat: 1.0 },
  { name: "Quinoa (cooked)", calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9 },
  { name: "Brown rice (cooked)", calories: 123, protein: 2.7, carbs: 25.6, fat: 1.0 },
  { name: "Whole wheat bread", calories: 247, protein: 13.0, carbs: 41.0, fat: 4.2 },
  { name: "Corn (sweet)", calories: 86, protein: 3.3, carbs: 19.0, fat: 1.4 },
  { name: "Millet (bajra flour)", calories: 361, protein: 11.0, carbs: 67.0, fat: 5.0 },
  { name: "Ragi flour", calories: 336, protein: 7.3, carbs: 72.0, fat: 1.5 },

  // PULSES AND LEGUMES
  { name: "Chickpeas (boiled)", calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6 },
  { name: "Rajma (boiled)", calories: 127, protein: 8.7, carbs: 22.8, fat: 0.5 },
  { name: "Moong dal (boiled)", calories: 105, protein: 7.0, carbs: 19.2, fat: 0.4 },
  { name: "Masoor dal (boiled)", calories: 116, protein: 9.0, carbs: 20.1, fat: 0.4 },
  { name: "Black chana (boiled)", calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6 },
  { name: "Soybeans (boiled)", calories: 172, protein: 18.2, carbs: 8.4, fat: 9.0 },
  { name: "Tofu", calories: 76, protein: 8.1, carbs: 1.9, fat: 4.8 },

  // DAIRY
  { name: "Whole milk", calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3 },
  { name: "Low-fat milk", calories: 42, protein: 3.4, carbs: 5.0, fat: 1.0 },
  { name: "Plain curd (dahi)", calories: 61, protein: 3.5, carbs: 4.7, fat: 3.3 },
  { name: "Greek yogurt (plain)", calories: 97, protein: 9.0, carbs: 3.9, fat: 5.0 },
  { name: "Cheddar cheese", calories: 403, protein: 24.9, carbs: 1.3, fat: 33.1 },
  { name: "Butter", calories: 717, protein: 0.9, carbs: 0.1, fat: 81.1 },
  { name: "Ghee", calories: 900, protein: 0, carbs: 0, fat: 100 },

  // COMMON INDIAN DISHES — highly recipe-dependent
  { name: "Vegetable poha (prepared)", calories: 180, protein: 4.0, carbs: 30.0, fat: 5.0 },
  { name: "Vegetable upma (prepared)", calories: 150, protein: 4.0, carbs: 25.0, fat: 4.0 },
  { name: "Idli", calories: 58, protein: 2.0, carbs: 12.0, fat: 0.4 },
  { name: "Plain dosa", calories: 168, protein: 4.0, carbs: 29.0, fat: 3.7 },
  { name: "Samosa", calories: 300, protein: 5.0, carbs: 32.0, fat: 17.0 },
  { name: "Vegetable biryani", calories: 170, protein: 3.5, carbs: 27.0, fat: 5.0 },
  { name: "Chicken biryani", calories: 200, protein: 12.0, carbs: 25.0, fat: 6.0 },
  { name: "Chole (prepared)", calories: 160, protein: 7.0, carbs: 22.0, fat: 5.0 },
  { name: "Rajma curry (prepared)", calories: 140, protein: 7.0, carbs: 19.0, fat: 4.0 },
  { name: "Palak paneer (prepared)", calories: 170, protein: 9.0, carbs: 7.0, fat: 12.0 },
  { name: "Matar paneer (prepared)", calories: 170, protein: 8.0, carbs: 10.0, fat: 11.0 },
  { name: "Mixed vegetable sabji", calories: 100, protein: 2.5, carbs: 12.0, fat: 5.0 },
  { name: "Aloo gobi (prepared)", calories: 110, protein: 2.5, carbs: 13.0, fat: 5.0 },
  { name: "Vegetable pulao", calories: 160, protein: 3.5, carbs: 28.0, fat: 4.0 },
  { name: "Khichdi (prepared)", calories: 120, protein: 4.0, carbs: 20.0, fat: 3.0 },
  { name: "Plain paratha", calories: 300, protein: 7.0, carbs: 45.0, fat: 10.0 },
  { name: "Aloo paratha", calories: 260, protein: 6.0, carbs: 38.0, fat: 9.0 },
  { name: "Pav bhaji", calories: 180, protein: 4.0, carbs: 24.0, fat: 7.0 },
  { name: "Dhokla", calories: 160, protein: 7.0, carbs: 24.0, fat: 4.0 },
  { name: "Besan chilla", calories: 180, protein: 8.0, carbs: 22.0, fat: 6.0 },
  { name: "Vegetable soup", calories: 35, protein: 1.5, carbs: 6.0, fat: 0.5 },
  { name: "Chicken breast (cooked)", calories: 165, protein: 31.0, carbs: 0, fat: 3.6 },
  { name: "Fish (cooked)", calories: 140, protein: 24.0, carbs: 0, fat: 4.0 }


];

function App() {
  const [query, setQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState(foods[0]);
  const [quantity, setQuantity] = useState("100");
  const [photo, setPhoto] = useState("");
  const [meal, setMeal] = useState("Breakfast");
  const [loggedMeals, setLoggedMeals] = useState([]);

  const grams = Math.max(0, Number(quantity) || 0);

  const nutrition = useMemo(() => {
    const factor = grams / 100;
    return {
      calories: selectedFood.calories * factor,
      protein: selectedFood.protein * factor,
      carbs: selectedFood.carbs * factor,
      fat: selectedFood.fat * factor,
    };
  }, [selectedFood, grams]);

  const results = foods.filter((food) =>
    food.name.toLowerCase().includes(query.toLowerCase())
  );

  function addMeal() {
    if (grams <= 0) return;

    setLoggedMeals((previous) => [
      ...previous,
      {
        id: Date.now(),
        name: selectedFood.name,
        quantity: grams,
        meal,
        calories: nutrition.calories,
      },
    ]);
  }

  const dailyCalories = loggedMeals.reduce(
    (total, item) => total + item.calories,
    0
  );

  function handlePhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Please choose an image smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <main className="app">
      <header className="topbar">
        <a className="brand" href="#">
          <span className="brand-icon">✳</span>
          AK Calorie Counter
        </a>
        <span className="date-label">Your daily nutrition</span>
      </header>

      <section className="hero">
        <p className="eyebrow">YOUR HEALTH, ONE MEAL AT A TIME</p>
        <h1>Eat well. Know better.</h1>
        <p>Track your food, understand your nutrition, and build better habits.</p>
      </section>

      <section className="dashboard">
        <div className="panel food-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FOOD TRACKER</p>
              <h2>Add your food</h2>
            </div>
            <span className="heading-icon">＋</span>
          </div>

          <label htmlFor="food-search">Search food</label>
          <input
            id="food-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try roti, rice, banana..."
          />

          <label htmlFor="food-select">Choose a food</label>
          <select
            id="food-select"
            value={selectedFood.name}
            onChange={(event) => {
              const food = foods.find((item) => item.name === event.target.value);
              if (food) {
                setSelectedFood(food);
                setQuery(food.name);
              }
            }}
          >
            {results.map((food) => (
              <option key={food.name} value={food.name}>
                {food.name}
              </option>
            ))}
          </select>

          {results.length === 0 && (
            <p className="hint">No sample food found. Try another name.</p>
          )}

          <div className="two-fields">
            <div>
              <label htmlFor="quantity">Quantity (grams)</label>
              <input
                id="quantity"
                type="number"
                min="1"
                max="5000"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="meal">Meal</label>
              <select
                id="meal"
                value={meal}
                onChange={(event) => setMeal(event.target.value)}
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
              </select>
            </div>
          </div>

          <div className="photo-box">
            <span className="photo-icon">▧</span>
            <strong>Identify food with a photo</strong>
            <p>Upload a picture to preview it. AI identification comes next.</p>
            <label className="upload-button" htmlFor="food-photo">
              Choose photo
            </label>
            <input
              id="food-photo"
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              hidden
            />
            {photo && (
              <img className="food-photo" src={photo} alt="Uploaded food" />
            )}
          </div>

          <button
            className="primary-button"
            onClick={addMeal}
            disabled={grams <= 0 || grams > 5000}
          >
            + Add food to daily log
          </button>
        </div>

        <div className="results-column">
          <div className="calorie-card">
            <div className="calorie-card-top">
              <span>ESTIMATED CALORIES</span>
              <span className="flame">✳</span>
            </div>
            <div className="calorie-number">
              {Math.round(nutrition.calories)}
              <span> kcal</span>
            </div>
            <p>
              {grams} g of {selectedFood.name}
            </p>
            <div className="calorie-divider" />
            <div className="daily-row">
              <span>Calories logged today</span>
              <strong>{Math.round(dailyCalories)} kcal</strong>
            </div>
          </div>

          <div className="panel macros-panel">
            <p className="eyebrow">NUTRITION BREAKDOWN</p>
            <h2>Your macros</h2>

            {[
              { name: "Protein", value: nutrition.protein, color: "protein" },
              { name: "Carbohydrates", value: nutrition.carbs, color: "carbs" },
              { name: "Fat", value: nutrition.fat, color: "fat" },
            ].map((macro) => (
              <div className="macro" key={macro.name}>
                <div className="macro-heading">
                  <span>{macro.name}</span>
                  <strong>{macro.value.toFixed(1)} g</strong>
                </div>
                <div className="progress-track">
                  <div
                    className={`progress-fill ${macro.color}`}
                    style={{
                      width: `${
                        Math.min(100, (macro.value / 70) * 100)
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
            <p className="hint">
              Values are estimates per selected quantity.
            </p>
          </div>

          <div className="panel log-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">TODAY</p>
                <h2>Food log</h2>
              </div>
              <span className="log-count">{loggedMeals.length}</span>
            </div>
            {loggedMeals.length === 0 ? (
              <p className="hint">Your meals will appear here when you add food.</p>
            ) : (
              loggedMeals.map((item) => (
                <div className="log-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.meal} · {item.quantity} g</p>
                  </div>
                  <strong>{Math.round(item.calories)} kcal</strong>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <footer>
        Nutrition estimates are illustrative and depend on the food and preparation.
      </footer>
    </main>
  );
}

export default App;

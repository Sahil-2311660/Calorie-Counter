
import { useMemo, useState } from "react";
import "./App.css";

const foods = [
  { name: "Roti", calories: 297, protein: 9.0, carbs: 55.0, fat: 7.5 },
  { name: "Cooked white rice", calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3 },
  { name: "Dal", calories: 116, protein: 7.5, carbs: 20.0, fat: 0.4 },
  { name: "Paneer", calories: 265, protein: 18.3, carbs: 1.2, fat: 20.8 },
  { name: "Matar Paneer", calories: 265, protein: 18.3, carbs: 1.2, fat: 20.8 },
  { name: "Boiled egg", calories: 155, protein: 13.0, carbs: 1.1, fat: 11.0 },
  { name: "Banana", calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
  { name: "Oats", calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9 },
  { name: "Cooked potato", calories: 87, protein: 1.9, carbs: 20.1, fat: 0.1 },
  { name: "Masala Chicken", calories: 130, protein: 10, carbs: 69, fat: 6 },

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

import { useState, useEffect } from 'react';
import type { Meal } from './types';
import { searchMeals, getCategories, getMealsByCategory, getMealById } from './api';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';

function App() {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [favourites, setFavourites] = useState<Meal[]>(() => {
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setError('Failed to load categories'));
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // FUNCTION: resets everything back to the home/welcome state
  function goHome() {
    setMeals([]);
    setActiveCategory('');
    setQuery('');
    setError('');
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    setError('');
    setActiveCategory('');
    try {
      const results = await searchMeals(query);
      setMeals(results);
      if (results.length === 0) setError('No recipes found. Try a different search!');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCategoryClick(category: string) {
    setActiveCategory(category);
    setQuery('');
    setIsLoading(true);
    setError('');
    try {
      const results = await getMealsByCategory(category);
      setMeals(results);
    } catch {
      setError('Failed to load category.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSelectMeal(meal: Meal) {
    if (meal.strInstructions) {
      setSelectedMeal(meal);
    } else {
      try {
        const fullMeal = await getMealById(meal.idMeal);
        if (fullMeal) setSelectedMeal(fullMeal);
      } catch {
        setError('Failed to load recipe details.');
      }
    }
  }

  function handleToggleFavourite(meal: Meal) {
    setFavourites((prev) =>
      prev.some((f) => f.idMeal === meal.idMeal)
        ? prev.filter((f) => f.idMeal !== meal.idMeal)
        : [...prev, meal]
    );
  }

  function isFavourite(meal: Meal): boolean {
    return favourites.some((f) => f.idMeal === meal.idMeal);
  }

  return (
    <div className="app">
      <header className="header">
        {/* clicking the title resets to home */}
        <h1
          className="site-title"
          onClick={goHome}
        >
          🍽️ Recipe Finder
        </h1>
        <p className="subtitle">Search thousands of recipes from around the world</p>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes e.g. chicken, pasta..."
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
      </header>

      {/* home button — only shows when not on home screen */}
      {meals.length > 0 && (
        <div className="home-bar">
          <button type="button" className="home-btn" onClick={goHome}>
            🏠 Home
          </button>
          <span className="home-bar-label">
            {activeCategory ? `${activeCategory} Recipes` : `Results for "${query}"`}
          </span>
        </div>
      )}

      <div className="categories">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {meals.length === 0 && !isLoading && !error && favourites.length === 0 && (
        <div className="welcome-section">
          <h2 className="welcome-heading">What are you cooking today?</h2>
          <p className="welcome-subheading">Click a category above or search to discover recipes</p>
          <div className="welcome-grid">
            <div className="welcome-card" onClick={() => handleCategoryClick('Beef')}>🥩<p>Beef</p></div>
            <div className="welcome-card" onClick={() => handleCategoryClick('Chicken')}>🍗<p>Chicken</p></div>
            <div className="welcome-card" onClick={() => handleCategoryClick('Pasta')}>🍝<p>Pasta</p></div>
            <div className="welcome-card" onClick={() => handleCategoryClick('Vegetarian')}>🥗<p>Vegetarian</p></div>
            <div className="welcome-card" onClick={() => handleCategoryClick('Seafood')}>🍣<p>Seafood</p></div>
            <div className="welcome-card" onClick={() => handleCategoryClick('Dessert')}>🍰<p>Dessert</p></div>
          </div>
          <div className="welcome-stats">
            <div>
              <p className="welcome-stat-value">300+</p>
              <p className="welcome-stat-label">Recipes</p>
            </div>
            <div>
              <p className="welcome-stat-value">13</p>
              <p className="welcome-stat-label">Categories</p>
            </div>
            <div>
              <p className="welcome-stat-value">25+</p>
              <p className="welcome-stat-label">Cuisines</p>
            </div>
          </div>
        </div>
      )}

      {favourites.length > 0 && meals.length === 0 && (
        <div className="section">
          <h2>❤️ Your Favourites</h2>
          <div className="recipes-grid">
            {favourites.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                meal={meal}
                onSelect={handleSelectMeal}
                isFavourite={isFavourite(meal)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        </div>
      )}

      {isLoading && <p className="status-message">Loading recipes...</p>}
      {error && !isLoading && <p className="error-message">{error}</p>}

      {meals.length > 0 && !isLoading && (
        <div className="section">
          <div className="recipes-grid">
            {meals.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                meal={meal}
                onSelect={handleSelectMeal}
                isFavourite={isFavourite(meal)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        </div>
      )}

      {selectedMeal && (
        <RecipeModal
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
          isFavourite={isFavourite(selectedMeal)}
          onToggleFavourite={handleToggleFavourite}
        />
      )}
    </div>
  );
}

export default App;
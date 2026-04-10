import type { RecipeCardProps } from './types';

// RecipeCard — displays a single recipe in the search results grid
function RecipeCard({ meal, onSelect, isFavourite, onToggleFavourite }: RecipeCardProps) {
  return (
    <div className="recipe-card" onClick={() => onSelect(meal)}>

      {/* meal image */}
      <div className="recipe-image-wrapper">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="recipe-image"
        />
        {/* favourite button — stopPropagation stops the card click firing too */}
        <button
          type="button"
          className={`favourite-btn ${isFavourite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite(meal);
          }}
        >
          {isFavourite ? '❤️' : '🤍'}
        </button>
      </div>

      {/* meal details */}
      <div className="recipe-info">
        <h3 className="recipe-name">{meal.strMeal}</h3>
        <div className="recipe-tags">
          <span className="tag">{meal.strCategory}</span>
          {meal.strArea && <span className="tag">{meal.strArea}</span>}
        </div>
      </div>

    </div>
  );
}

export default RecipeCard;
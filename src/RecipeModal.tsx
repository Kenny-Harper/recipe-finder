import { getIngredients } from './api';
import type { RecipeModalProps } from './types';

function RecipeModal({ meal, onClose, isFavourite, onToggleFavourite }: RecipeModalProps) {
  const ingredients = getIngredients(meal);
  const youtubeLink = meal['strYoutube'] as string;

  function handleYoutubeClick(e: React.MouseEvent) {
    e.stopPropagation();
    window.open(youtubeLink, '_blank');
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <button type="button" className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="modal-image" />
          <div className="modal-title-area">
            <h2>{meal.strMeal}</h2>
            <div className="recipe-tags">
              <span className="tag">{meal.strCategory}</span>
              {meal.strArea && <span className="tag">{meal.strArea}</span>}
            </div>
            <button
              type="button"
              className={`favourite-btn-large ${isFavourite ? 'active' : ''}`}
              onClick={() => onToggleFavourite(meal)}
            >
              {isFavourite ? '❤️ Saved' : '🤍 Save Recipe'}
            </button>
            {youtubeLink && (
              <button type="button" className="youtube-link" onClick={handleYoutubeClick}>
                ▶ Watch on YouTube ↗
              </button>
            )}
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h3>Instructions</h3>
            <p className="instructions">{meal.strInstructions}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RecipeModal;
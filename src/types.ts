// types.ts — all TypeScript interfaces for the recipe finder

// a single meal returned from the search results
export interface Meal {
  idMeal: string;           // unique ID from the API
  strMeal: string;          // meal name
  strCategory: string;      // e.g. "Chicken", "Vegetarian"
  strArea: string;          // e.g. "Italian", "Japanese"
  strInstructions: string;  // full cooking instructions
  strMealThumb: string;     // URL of the meal image
  strYoutube: string;       // YouTube video link
  strTags: string | null;   // comma separated tags or null
  // ingredients and measures — API returns up to 20 of each
  [key: string]: string | null; // index signature for dynamic ingredient keys
}

// the shape of the API search response
export interface MealSearchResponse {
  meals: Meal[] | null; // null when no results found
}

// the shape of the API categories response
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface CategoryResponse {
  categories: Category[];
}

// props for the RecipeCard component
export interface RecipeCardProps {
  meal: Meal;
  onSelect: (meal: Meal) => void; // called when user clicks a card
  isFavourite: boolean;
  onToggleFavourite: (meal: Meal) => void;
}

// props for the RecipeModal component
export interface RecipeModalProps {
  meal: Meal;
  onClose: () => void;
  isFavourite: boolean;
  onToggleFavourite: (meal: Meal) => void;
}
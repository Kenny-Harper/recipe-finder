// api.ts — all functions that talk to TheMealDB API
// keeping API calls in one file makes them easy to find and change
import type { MealSearchResponse, CategoryResponse, Category, Meal } from './types';

// base URL for TheMealDB API — free tier, no API key needed
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// search meals by name
// async/await means this function waits for the API to respond before continuing
// the : Promise<Meal[]> return type tells TypeScript this returns a promise of meals
export async function searchMeals(query: string): Promise<Meal[]> {
  // if query is empty return empty array immediately
  if (!query.trim()) return [];

  // fetch sends an HTTP GET request to the URL
  const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);

  // if the response status is not 200 OK throw an error
  if (!response.ok) throw new Error('Failed to fetch meals');

  // .json() parses the response body as JSON
  const data: MealSearchResponse = await response.json();

  // API returns null when no results found — we convert to empty array
  return data.meals ?? [];
}

// fetch meals by category
export async function getMealsByCategory(category: string): Promise<Meal[]> {
  const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  if (!response.ok) throw new Error('Failed to fetch meals by category');
  const data: MealSearchResponse = await response.json();
  return data.meals ?? [];
}

// fetch full meal details by ID
// needed because category filter only returns basic info
export async function getMealById(id: string): Promise<Meal | null> {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  if (!response.ok) throw new Error('Failed to fetch meal details');
  const data: MealSearchResponse = await response.json();
  return data.meals ? data.meals[0] : null;
}

// fetch all available categories
export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/categories.php`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  const data: CategoryResponse = await response.json();
  return data.categories.map((c: Category) => c.strCategory);
}

// extract ingredients from a meal object
// the API stores ingredients as strIngredient1, strIngredient2 etc up to 20
// this helper pulls them all out into a clean array
export function getIngredients(meal: Meal): string[] {
  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    // only add if ingredient exists and is not empty
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure?.trim() || ''} ${ingredient.trim()}`.trim());
    }
  }

  return ingredients;
}
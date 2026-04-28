# 🍽️ Recipe Finder

<img width="846" height="825" alt="Screenshot 2026-04-28 at 10 17 08" src="https://github.com/user-attachments/assets/4adb535e-7f20-41a4-8356-9dc64e6c3db8" />

## Live Demo
https://kenny-harper-recipe-finder.netlify.app

## Intro
A recipe search app built with React, TypeScript and Vite using the free TheMealDB API to search and browse thousands of real recipes from around the world.

## Features
- Search recipes by name e.g. "chicken", "pasta"
- Browse by category — Beef, Chicken, Dessert, Vegetarian and more
- Click any recipe to see full ingredients and instructions
- Save favourite recipes that persist with localStorage
- Quick category cards on the home screen
- Home button to return to welcome screen from any view
- Loading and error states handled gracefully

## Tech Stack
- React
- TypeScript
- Vite
- TheMealDB API (free, no API key required)
- CSS (custom styling)

## TypeScript Concepts Used
- Interfaces for all API response shapes
- Typed component props
- Async/await with typed return values
- import type for type-only imports
- Union types and null safety

## React Concepts Used
- useState for search, results, categories, modal and favourites
- useEffect for API calls and localStorage sync
- Async functions with try/catch/finally for error handling
- Conditional rendering for loading, error and empty states
- Props passing data and functions between components
- localStorage persistence for favourites

## Architecture
- App.tsx — root component, holds all state and logic
- RecipeCard.tsx — displays a single recipe in the grid
- RecipeModal.tsx — full recipe details in a modal overlay
- api.ts — all API calls to TheMealDB in one place
- types.ts — all TypeScript interfaces in one place

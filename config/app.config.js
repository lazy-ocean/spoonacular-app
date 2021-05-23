module.exports = {
  SPOONACULAR_KEY: process.env.SPOONACULAR_KEY || "",
  SPOONACULAR_SEARCH:
    process.env.SPOONACULAR_SEARCH || "https://api.spoonacular.com/recipes/complexSearch",
  SPOONACULAR_INGREDIENTS:
    process.env.SPOONACULAR_INGREDIENTS || "https://api.spoonacular.com/food/ingredients/search",
  CACHED_SPOONACULAR_INGREDIENTS: process.env.CACHED_SPOONACULAR_INGREDIENTS || "/api/cache",
  SPOONACULAR_MEALS: process.env.SPOONACULAR_MEALS || "/api/meals",
  CACHE_MAX: process.env.CACHE_MAX_SIZE || 100,
  CACHE_MAX_AGE: process.env.CACHE_MAX_AGE || 1200,
};

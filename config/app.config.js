module.exports = {
  SPOONACULAR_KEY: process.env.SPOONACULAR_KEY || "",
  SPOONACULAR_SEARCH:
    process.env.SPOONACULAR_SEARCH || "https://api.spoonacular.com/food/ingredients/search",
  CACHED_SPOONACULAR_SEARCH: process.env.CACHED_SPOONACULAR_SEARCH || "/api/cache",
  CACHE_MAX: process.env.CACHE_MAX_SIZE || 100,
  CACHE_MAX_AGE: process.env.CACHE_MAX_AGE || 1200,
};

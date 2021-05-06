import getConfig from "next/config";
import LRU from "lru-cache";

const {
  publicRuntimeConfig: { CACHE_MAX, CACHE_MAX_AGE },
} = getConfig();

const context = {
  cache: new LRU({
    max: CACHE_MAX,
    maxAge: CACHE_MAX_AGE * 1000, // 1 hour
  }),
};

const cache = (wrapperCacheFunc) => (req, res) => {
  req.cache = context.cache;
  return wrapperCacheFunc(req, res);
};

export default cache;

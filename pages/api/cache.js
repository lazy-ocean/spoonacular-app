import axios from "axios";
import cache from "../../utils/cacheInit";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { SPOONACULAR_SEARCH },
} = getConfig();

const cacheWrapper = async (req, res) => {
  const key = encodeURIComponent(req.url);

  // retrieving from cache
  if (req.cache && req.cache.has(key)) {
    console.log("retrieving cached recipe");
    const { data } = req.cache.get(key);
    res.setHeader("X-Cache", "HIT");
    return res.json(data);
  }

  // requesting missing ingredient and caching
  try {
    console.log("adding new recipe");
    const { status, data } = await axios(SPOONACULAR_SEARCH, {
      params: req.query,
    });

    if (res.statusCode === 200) {
      if (req.cache) {
        req.cache.set(key, {
          data,
        });
      }
      res.setHeader("X-Cache", "MISS");
      return res.json(data);
    } else {
      return res.status(status).json(data);
    }
  } catch (e) {
    // TODO
    console.log(e);
    /* const { status, data } = _get(error, 'response', {})
    return res.status(status).json(data) */
  }
};

export default cache(cacheWrapper);

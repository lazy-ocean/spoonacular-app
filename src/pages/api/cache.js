import axios from "axios";
import cache from "../../utils/cacheInit";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { SPOONACULAR_INGREDIENTS },
} = getConfig();

const cacheWrapper = async (req, res) => {
  const key = encodeURIComponent(req.url);

  // retrieving from cache
  if (req.cache && req.cache.has(key)) {
    console.log("retrieving cached ingredient");
    const { data } = req.cache.get(key);
    res.setHeader("X-Cache", "HIT");
    return res.json(data);
  }

  // requesting missing ingredient and caching
  try {
    console.log("adding new ingredient");
    const { status, data } = await axios(SPOONACULAR_INGREDIENTS, {
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
    const { status, data } = e.response;
    return res.status(status).json(data);
  }
};

export default cache(cacheWrapper);
import axios from "axios";
import getConfig from "next/config";
import cache from "../../utils/cacheInit";

const {
  publicRuntimeConfig: { SPOONACULAR_INGREDIENTS, SPOONACULAR_KEY },
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
      params: {
        metaInformation: true,
        apiKey: SPOONACULAR_KEY,
        query: req.query.query,
      },
    });
    if (status === 200) {
      if (req.cache) {
        req.cache.set(key, {
          data,
        });
      }
      res.setHeader("X-Cache", "MISS");
      return res.status(200).json(data);
    } else {
      return res.status(status).json(data);
    }
  } catch (e) {
    const { status, data } = e.response;
    return res.status(status).json(data);
  }
};

export default cache(cacheWrapper);

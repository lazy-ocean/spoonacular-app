import axios from "axios";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { SPOONACULAR_SEARCH, SPOONACULAR_KEY },
} = getConfig();

const getMeals = async (req, res) => {
  console.log("getting meals");
  try {
    const { status, data } = await axios(SPOONACULAR_SEARCH, {
      params: {
        apiKey: SPOONACULAR_KEY,
        query: req.query.query,
        addRecipeNutrition: true,
        number: 6,
      },
    });
    if (status === 200) {
      return res.status(200).json(data);
    } else {
      return res.status(status).json(data);
    }
  } catch (e) {
    const { status, data } = e.response;
    return res.status(status).json(data);
  }
};

export default getMeals;

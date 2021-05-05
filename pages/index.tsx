import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "next/config";
import styles from "../styles/Home.module.css";

const {
  publicRuntimeConfig: { SPOONACULAR_KEY, SPOONACULAR_SEARCH },
} = getConfig();

interface Recipe {
  id: number;
  calories: number;
  carbs: string;
  fat: string;
  image: string;
  imageType: string;
  protein: string;
  title: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  /*   const getRecipes = async () => {
    const response = await axios.get(SPOONACULAR_SEARCH, {
      params: {
        apiKey: SPOONACULAR_KEY,
        number: 5,
      },
    });
    setRecipes(response.data.results);
  };

  useEffect(() => {
    getRecipes();
  }, []); */

  return (
    <div className={styles.container}>
      <Head>
        <title>Spoonacular App</title>
        <meta name="description" content="Fetching data from Spoonacular API with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Spoonacular App 🥄</h1>
        {recipes.length &&
          recipes.map((recipe: Recipe) => (
            <div key={recipe.id}>
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} />
            </div>
          ))}
      </main>
    </div>
  );
}

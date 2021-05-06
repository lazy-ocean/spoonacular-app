import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import getConfig from "next/config";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import SearchPanel from "../components/searchPanel";

const {
  publicRuntimeConfig: { SPOONACULAR_KEY, CACHED_SPOONACULAR_SEARCH },
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
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const router = useRouter();

  useEffect(() => {
    const getRecipes = async () => {
      const response = await axios(CACHED_SPOONACULAR_SEARCH, {
        params: {
          apiKey: SPOONACULAR_KEY,
          query,
        },
      });
      setRecipes(response.data.results);
      router.push(
        {
          pathname: "/",
          query: {
            ingredients: query,
          },
        },
        undefined,
        { shallow: true }
      );
    };
    if (query) getRecipes();
  }, [query]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Spoonacular App</title>
        <meta name="description" content="Fetching data from Spoonacular API with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Spoonacular App 🥄</h1>
        <SearchPanel setQuery={setQuery} />
        {recipes.length
          ? recipes.map((recipe: Recipe) => (
              <div key={recipe.id}>
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} />
              </div>
            ))
          : null}
      </main>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import getConfig from "next/config";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import SearchPanel from "../components/searchPanel";
import LastSearches from "../components/lastSearches";
import ResultsList from "../components/resultBlocks/list";
import storageWorker from "../utils/storageWorker";
import { Recipe, Ingredient } from "../utils/types";
import { Flex, Container, Heading } from "@chakra-ui/react";

const {
  publicRuntimeConfig: { SPOONACULAR_KEY, CACHED_SPOONACULAR_INGREDIENTS, SPOONACULAR_SEARCH },
} = getConfig();

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [lastSearchedItems, setLastSearchedItems] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const getIngredients = async () => {
      const response = await axios(CACHED_SPOONACULAR_INGREDIENTS, {
        params: {
          metaInformation: true,
          apiKey: SPOONACULAR_KEY,
          query,
        },
      });
      setIngredients(response.data.results);
      setLastSearchedItems(storageWorker(query, lastSearchedItems));
      router.push(
        {
          pathname: "/",
          query: {
            query,
          },
        },
        undefined,
        { shallow: true }
      );
    };
    if (query) getIngredients();
  }, [query]);

  /*   useEffect(() => {
    const getRecipes = async () => {
      const response = await axios(CACHED_SPOONACULAR_SEARCH, {
        params: {
          apiKey: SPOONACULAR_KEY,
          query,
          addRecipeNutrition: true,
        },
      });
      setRecipes(response.data.results);

      setLastSearchedItems(storageWorker(query, lastSearchedItems));
      router.push(
        {
          pathname: "/",
          query: {
            query,
          },
        },
        undefined,
        { shallow: true }
      );
    };
    if (query) getRecipes();
  }, [query]); */

  useEffect(() => {
    let lastRequests = [];
    if (window.localStorage.getItem("spoonacularLastTen") !== null) {
      let item = window.localStorage.getItem("spoonacularLastTen") || "";
      lastRequests = JSON.parse(item);
    }
    setLastSearchedItems(lastRequests);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Spoonacular App</title>
        <meta name="description" content="Fetching data from Spoonacular API with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        width="100%"
        as="header"
        padding="1.5rem"
        bg="green.500"
        color="white"
        marginBottom="1rem"
      >
        <Heading as="h1" className={styles.title}>
          Spoonacular App 🥄
        </Heading>
      </Flex>
      <main>
        <Container maxWidth="1640px">
          <SearchPanel setQuery={setQuery} />
          <Flex marginBottom="8">
            <LastSearches lastSearchedItems={lastSearchedItems} setQuery={setQuery} />
            <ResultsList items={ingredients} type="ingredients" />
          </Flex>
          <ResultsList items={recipes} type="recipes" />
        </Container>
      </main>
    </div>
  );
}

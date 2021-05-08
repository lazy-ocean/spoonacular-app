import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import getConfig from "next/config";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import SearchPanel from "../components/searchPanel";
import LastSearches from "../components/lastSearches";
import RecipesList from "../components/recipes/recipesList";
import storageWorker from "../utils/storageWorker";
import Recipe from "../utils/types";
import { Flex, Container, Heading } from "@chakra-ui/react";

const {
  publicRuntimeConfig: { SPOONACULAR_KEY, CACHED_SPOONACULAR_SEARCH },
} = getConfig();

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [lastSearchedItems, setLastSearchedItems] = useState<string[]>([]);

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

      setLastSearchedItems(storageWorker(query, lastSearchedItems));
      router.push(
        {
          pathname: "/",
          query: {
            query,
            number: 10,
          },
        },
        undefined,
        { shallow: true }
      );
    };
    if (query) getRecipes();
  }, [query]);

  useEffect(() => {
    const lastRequests = JSON.parse(window.localStorage.getItem("spoonacularLastTen")) || [];
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
      <main className={styles.main}>
        <Container maxWidth="1640px">
          <SearchPanel setQuery={setQuery} />
          <Flex gridGap="10">
            {/* <LastSearches lastSearchedItems={lastSearchedItems} /> */}
            <RecipesList recipes={recipes} />
          </Flex>
        </Container>
      </main>
    </div>
  );
}

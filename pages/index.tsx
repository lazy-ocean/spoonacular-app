import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import getConfig from "next/config";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import SearchPanel from "../components/searchPanel";
import LastSearches from "../components/lastSearches";
import ResultsList from "../components/resultBlocks/list";
import storageWorker from "../utils/storageWorker";
import { Recipe, Ingredient } from "../utils/types";
import { Flex, Container } from "@chakra-ui/react";
import ModalWindow from "../components/modal";

const {
  publicRuntimeConfig: { SPOONACULAR_KEY, CACHED_SPOONACULAR_INGREDIENTS, SPOONACULAR_SEARCH },
} = getConfig();

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [lastSearchedItems, setLastSearchedItems] = useState<string[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const getIngredients = async () => {
      try {
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
      } catch (e) {
        setModal(true);
        if (e.response?.status === 402) {
          setModalType("limit");
        } else {
          setModalType("ingredients");
        }
      }
    };
    if (query) getIngredients();
  }, [query]);

  useEffect(() => {
    let lastRequests = [];
    if (window.localStorage.getItem("spoonacularLastTen") !== null) {
      let item = window.localStorage.getItem("spoonacularLastTen") || "";
      lastRequests = JSON.parse(item);
    }
    setLastSearchedItems(lastRequests);
  }, []);

  const getRecipes = async (ingredient: string) => {
    try {
      const response = await axios(SPOONACULAR_SEARCH, {
        params: {
          apiKey: SPOONACULAR_KEY,
          query: ingredient,
          addRecipeNutrition: true,
          number: 6,
        },
      });
      if (!response.data.results.length) {
        setModal(true);
        setModalType("ingredients");
      } else {
        setRecipes(response.data.results);
      }
    } catch (e) {
      setModal(true);
      setModalType("error");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Spoonacular App</title>
        <meta name="description" content="Fetching data from Spoonacular API with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Container maxWidth="1640px">
          <SearchPanel setQuery={setQuery} />
          <Flex marginBottom="8" className={styles["main__ingredients"]}>
            <LastSearches lastSearchedItems={lastSearchedItems} setQuery={setQuery} />
            <ResultsList items={ingredients} type="ingredients" getRecipes={getRecipes} />
          </Flex>
          <ResultsList items={recipes} type="recipes" getRecipes={getRecipes} />
        </Container>
        <ModalWindow modal={modal} setModal={setModal} type={modalType} />
      </main>
    </div>
  );
}

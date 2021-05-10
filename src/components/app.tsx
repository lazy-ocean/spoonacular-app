import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import SearchPanel from "../components/searchPanel";
import LastSearches from "../components/lastSearches";
import ResultsList from "../components/resultBlocks/list";
import ModalWindow from "../components/modal";
import useLastSearchItems from "../hooks/useLastSearchItems";
import { Recipe, Ingredient } from "../types/domain";
import { Flex, Container } from "@chakra-ui/react";

const {
  publicRuntimeConfig: { SPOONACULAR_KEY, CACHED_SPOONACULAR_INGREDIENTS, SPOONACULAR_SEARCH },
} = getConfig();

const QUERY_SEARCH_PARAM = "query";

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [lastSearchedItems, addLastSearchedItem] = useLastSearchItems();
  const [modal, setModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("");
  const [recipesLoading, setRecipesLoading] = useState<boolean>(false);
  const [ingredientsLoading, setIngredientsLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchParam = router.query[QUERY_SEARCH_PARAM]?.toString() || "";

  useEffect(() => {
    if (router.isReady) {
      setQuery(searchParam);
      getIngredients(searchParam);
    }
  }, [router.isReady, searchParam]);

  const setSearchParam = (q: string) => {
    router.push(
      {
        pathname: "/",
        query: {
          [QUERY_SEARCH_PARAM]: q,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const getIngredients = async (query: string) => {
    if (query !== "") {
      setIngredientsLoading(true);
      try {
        const response = await axios(CACHED_SPOONACULAR_INGREDIENTS, {
          params: {
            metaInformation: true,
            apiKey: SPOONACULAR_KEY,
            query,
          },
        });
        setIngredients(response.data.results);
        addLastSearchedItem(query);
      } catch (e) {
        setModal(true);
        if (e.response?.status === 402) {
          setModalType("limit");
        } else {
          setModalType("ingredients");
        }
      } finally {
        setIngredientsLoading(false);
      }
    } else setIngredients([]);
  };

  const getRecipes = async (ingredient: string) => {
    setRecipesLoading(true);
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
    } finally {
      setRecipesLoading(false);
    }
  };

  return (
    <main>
      <Container maxWidth="1640px">
        <SearchPanel
          value={query}
          onSubmit={(e) => {
            setSearchParam(query);
          }}
          onChange={setQuery}
        />
        <Flex marginBottom="8" className={styles["main__ingredients"]}>
          <LastSearches lastSearchedItems={lastSearchedItems} setQuery={setSearchParam} />
          <ResultsList
            items={ingredients}
            type="ingredients"
            getRecipes={getRecipes}
            query={searchParam}
            isLoading={ingredientsLoading}
          />
        </Flex>
        <ResultsList
          items={recipes}
          type="recipes"
          getRecipes={getRecipes}
          query={searchParam}
          isLoading={recipesLoading}
        />
      </Container>
      <ModalWindow modal={modal} setModal={setModal} type={modalType} />
    </main>
  );
};

export default App;

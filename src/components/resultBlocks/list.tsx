import { Recipe, Ingredient } from "../../types/domain";
import RecipeCard from "./cards/recipeCard";
import IngredientCard from "./cards/ingredientCard";
import mocks from "./mocks";
import { Container, Heading, Flex, Text } from "@chakra-ui/react";
import Spinner from "../../components/spinner";

interface Props {
  items: Recipe[] | Ingredient[];
  type: "ingredients" | "recipes";
  query: string;
  isLoading: boolean;
  getRecipes: (ingredient: string) => void;
}

const ResultsList: React.FC<Props> = ({ items, type, getRecipes, query, isLoading }) => {
  const workingItems = items.length ? items : mocks[type];
  const heading = (
    <Heading fontSize={["xl", "xl", "2xl", "3xl"]}>
      {items.length
        ? `Here's what we found with ${query}`
        : type === "ingredients"
        ? "Some example ingredients"
        : "Something inspiring while you're choosing an ingredient"}
    </Heading>
  );
  return (
    <Container
      maxW="100%"
      bg="gray.50"
      p={[5, 5, "2.5rem", "2.5rem"]}
      borderRightRadius="md"
      borderLeftRadius={type === "recipes" ? "md" : "none"}
      borderBottomLeftRadius={type === "recipes" ? "md" : ["md", "md", "md", "none"]}
      borderTopRightRadius={type === "recipes" ? "md" : ["none", "none", "none", "md"]}
      border="1px"
      borderColor="gray.200"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {heading}
          {type === "ingredients" ? (
            <Text marginTop="3">Click on ingredient to search for recipes</Text>
          ) : null}
          <Flex gridGap={[4, 4, 6, 8]} flexWrap="wrap" marginTop="6">
            {type === "recipes"
              ? workingItems.map((recipe: any) => <RecipeCard recipe={recipe} key={recipe.id} />)
              : workingItems.map((ingredient: any) => (
                  <IngredientCard
                    ingredient={ingredient}
                    key={ingredient.id}
                    getRecipes={getRecipes}
                  />
                ))}{" "}
          </Flex>
        </>
      )}
    </Container>
  );
};

export default ResultsList;

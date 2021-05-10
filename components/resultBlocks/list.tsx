import { Recipe, Ingredient } from "../../utils/types";
import RecipeCard from "./recipeCard";
import IngredientCard from "./ingredientCard";
import mocs from "./mocs";
import { Container, Heading, Flex } from "@chakra-ui/react";

interface Props {
  items: Recipe[] | Ingredient[];
  type: "ingredients" | "recipes";
  getRecipes: (ingredient: string) => void;
}

const ResultsList: React.FC<Props> = ({ items, type, getRecipes }) => {
  const workingItems = items.length ? items : mocs[type];
  return (
    <Container
      maxW="100%"
      bg="gray.50"
      p={[5, 5, "2.5rem", "2.5rem"]}
      borderRightRadius="md"
      border="1px"
      borderColor="gray.200"
    >
      <Heading marginBottom="8" fontSize={["xl", "xl", "2xl", "3xl"]}>
        {items.length
          ? "Here's what we found:"
          : type === "ingredients"
          ? "Some example ingredients:"
          : "Something inspiring while you're choosing an ingredient:"}
      </Heading>
      <Flex gridGap={[4, 4, 6, 8]} flexWrap="wrap">
        {type === "recipes"
          ? workingItems.map((recipe: any) => <RecipeCard recipe={recipe} key={recipe.id} />)
          : workingItems.map((ingredient: any) => (
              <IngredientCard ingredient={ingredient} key={ingredient.id} getRecipes={getRecipes} />
            ))}
      </Flex>
    </Container>
  );
};

export default ResultsList;

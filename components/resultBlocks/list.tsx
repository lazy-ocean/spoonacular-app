import { Recipe, Ingredient } from "../../utils/types";
import RecipeCard from "./recipeCard";
import IngredientCard from "./ingredientCard";
import exampleRecipes from "./exampleRecipes";
import { Container, Heading, Flex } from "@chakra-ui/react";

interface Props {
  items: Recipe[] | Ingredient[];
  type: "ingredients" | "recipes";
}

const ResultsList: React.FC<Props> = ({ items, type }) => {
  const workingItems = items.length ? items : exampleRecipes;
  return (
    <Container
      maxW="100%"
      bg="gray.50"
      padding="2rem 4.5rem"
      borderRightRadius="md"
      border="1px"
      borderColor="gray.200"
    >
      <Heading marginBottom="8">
        {workingItems.length
          ? "Here's what we found:"
          : "Something inspiring while you're choosing an ingredient:"}
      </Heading>
      <Flex gridGap="10" flexWrap="wrap">
        {type === "recipes"
          ? workingItems.map((recipe: any) => <RecipeCard recipe={recipe} key={recipe.id} />)
          : workingItems.map((ingredient: any) => (
              <IngredientCard ingredient={ingredient} key={ingredient.id} />
            ))}
      </Flex>
    </Container>
  );
};

export default ResultsList;

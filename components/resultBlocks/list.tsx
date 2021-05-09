import { Recipe, Ingredient } from "../../utils/types";
import RecipeCard from "./recipeCard";
import IngredientCard from "./ingredientCard";
import mocs from "./mocs";
import { Container, Heading, Flex } from "@chakra-ui/react";

interface Props {
  items: Recipe[] | Ingredient[];
  type: "ingredients" | "recipes";
}

const ResultsList: React.FC<Props> = ({ items, type }) => {
  const workingItems = items.length ? items : mocs[type];
  return (
    <Container
      maxW="100%"
      bg="gray.50"
      padding="2.5rem"
      borderRightRadius="md"
      border="1px"
      borderColor="gray.200"
    >
      <Heading marginBottom="8">
        {items.length
          ? "Here's what we found:"
          : type === "ingredients"
          ? "Some example ingredients:"
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

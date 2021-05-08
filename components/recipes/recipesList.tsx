import Recipe from "../../utils/types";
import RecipeCard from "./recipeCard";
import exampleRecipes from "./exampleRecipes";
import { Container, Heading, Flex } from "@chakra-ui/react";

interface Props {
  recipes: Recipe[];
}

const RecipesList: React.FC<Props> = ({ recipes }) => {
  const workingRecipes = recipes.length ? recipes : exampleRecipes;
  return (
    <Container
      maxW="100%"
      bg="gray.50"
      padding="3.5rem 4.5rem"
      borderRadius="md"
      border="1px"
      borderColor="gray.200"
      boxShadow="lg"
    >
      <Heading marginBottom="8">
        {recipes.length
          ? "Here's what we found:"
          : "Something inspiring while you're choosing an ingredient:"}
      </Heading>
      <Flex gridGap="10" flexWrap="wrap">
        {workingRecipes.map((recipe: Recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </Flex>
    </Container>
  );
};

export default RecipesList;

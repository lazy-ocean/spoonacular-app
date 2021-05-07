import Recipe from "../../utils/types";
import RecipeCard from "./recipeCard";
import { Container, Heading } from "@chakra-ui/react";

interface Props {
  recipes: Recipe[];
}

const exampleRecipes = [
  {
    id: 716429,
    calories: 584,
    carbs: "84g",
    fat: "20g",
    image: "https://spoonacular.com/recipeImages/716429-312x231.jpg",
    imageType: "jpg",
    protein: "19g",
    title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
  },
  {
    id: 715538,
    calories: 521,
    carbs: "69g",
    fat: "10g",
    image: "https://spoonacular.com/recipeImages/715538-312x231.jpg",
    imageType: "jpg",
    protein: "35g",
    title: "What to make for dinner tonight?? Bruschetta Style Pork & Pasta",
  },
];

const RecipesList: React.FC<Props> = ({ recipes }) => {
  const workingRecipes = recipes.length ? recipes : exampleRecipes;
  return (
    <Container
      maxW="100%"
      bg="gray.50"
      padding="8"
      borderRadius="md"
      border="1px"
      borderColor="gray.200"
    >
      <Heading marginBottom="5">
        {recipes.length
          ? "Here's what we found:"
          : "Something inspiring while you're choosing an ingredient:"}
      </Heading>
      {workingRecipes.map((recipe: Recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} />
      ))}
    </Container>
  );
};

export default RecipesList;

import { Ingredient } from "../../utils/types";
import { Box, Heading, Image, Link } from "@chakra-ui/react";

interface Props {
  ingredient: Ingredient;
  getRecipes: (ingredient: string) => void;
}

const IngredientCard: React.FC<Props> = ({ ingredient, getRecipes }) => {
  const { image, name } = ingredient;

  return (
    <Box
      bg="white"
      borderRadius="md"
      border="1px"
      borderColor="gray.200"
      d="flex"
      alignItems="center"
      paddingRight="3"
    >
      <Image
        src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}
        alt={name}
        boxSize="100px"
        objectFit="cover"
        borderRadius="md"
        marginRight="5"
      />
      <Heading size="md" marginBottom="3">
        <Link onClick={() => getRecipes(name)}>{name}</Link>
      </Heading>
    </Box>
  );
};

export default IngredientCard;

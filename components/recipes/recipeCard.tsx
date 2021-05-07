import Recipe from "../../utils/types";
import { Box, Heading, Image, Link } from "@chakra-ui/react";

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  return (
    <Box
      bg="white"
      borderRadius="md"
      border="1px"
      borderColor="gray.200"
      d="flex"
      alignItems="center"
      marginBlockStart="4"
      marginBlockEnd="4"
    >
      <Image
        src={recipe.image}
        alt={recipe.title}
        boxSize="150px"
        objectFit="cover"
        borderRadius="md"
        marginRight="5"
      />
      <Box>
        <Heading size="md" marginBottom="3">
          {recipe.title}
        </Heading>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, aperiam?</p>
      </Box>
    </Box>
  );
};

export default RecipeCard;

import { Ingredient } from "../../utils/types";
import { Box, Heading, Image } from "@chakra-ui/react";

interface Props {
  ingredient: Ingredient;
}

const IngredientCard: React.FC<Props> = ({ ingredient }) => {
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
        {name}
      </Heading>
    </Box>
  );
};

export default IngredientCard;

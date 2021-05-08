import Recipe from "../../utils/types";
import { Box, Heading, Image, Flex, Text } from "@chakra-ui/react";

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const { image, title, calories, carbs, fat, protein } = recipe;
  const mealParams = [
    { label: "calories", value: calories },
    { label: "carbs", value: carbs },
    { label: "fat", value: fat },
    { label: "protein", value: protein },
  ];
  return (
    <Box
      bg="white"
      width="48%"
      borderRadius="md"
      border="1px"
      borderColor="gray.200"
      d="flex"
      alignItems="center"
      paddingRight="3"
    >
      <Image
        src={image}
        alt={title}
        boxSize="150px"
        objectFit="cover"
        borderRadius="md"
        marginRight="5"
      />
      <Box>
        <Heading size="md" marginBottom="3">
          {title}
        </Heading>
        <Flex gridGap="8">
          {mealParams.map(({ label, value }) => (
            <Flex flexDirection="column">
              <Heading color="green.800" as="h5" size="md">
                {value}
              </Heading>
              <Text>{label}</Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

/* calories: 521,
carbs: "69g",
fat: "10g",
protein: "35g", */

export default RecipeCard;

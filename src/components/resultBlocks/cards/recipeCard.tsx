import React from "react";
import { Box, Heading, Image, Flex, Text } from "@chakra-ui/react";
import { Recipe } from "../../../types/domain";

import styles from "../../../styles/Home.module.css";

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const { image, title, nutrition } = recipe;
  const { caloricBreakdown } = nutrition;
  const { percentCarbs, percentFat, percentProtein } = caloricBreakdown;
  const mealParams = [
    { label: "carbs", value: percentCarbs },
    { label: "fat", value: percentFat },
    { label: "protein", value: percentProtein },
  ];
  return (
    <Box
      bg="white"
      minW="48%"
      borderRadius="md"
      border="1px"
      borderColor="gray.200"
      d="flex"
      alignItems="center"
      p={[2, 3, 0, 0]}
      pr={[0, 0, 3, 3]}
      className={styles["card__recipe"]}
    >
      <Image
        src={image}
        alt={title}
        boxSize="150px"
        objectFit="cover"
        borderRadius="md"
        marginRight={[0, 3, 5, 5]}
        marginBottom={[2, 2, 0, 0]}
      />
      <Box className={styles["card--recipe--txt"]}>
        <Heading
          fontSize="1.2rem"
          marginBottom="3"
          className={styles["card--recipe--header"]}
          data-cy="recipe"
        >
          {title}
        </Heading>
        <Flex gridGap="8">
          {mealParams.map(({ label, value }) => (
            <Flex flexDirection="column" key={`recipe-${label}`}>
              <Heading color="green.800" as="h5" size="md">
                {value}%
              </Heading>
              <Text>{label}</Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default RecipeCard;

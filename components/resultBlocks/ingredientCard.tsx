import { Ingredient } from "../../utils/types";
import { Box, Heading, Image, Link } from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";

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
      p={[2, 2, 2, 0]}
      pr={[0, 3, 3, 3]}
      className={styles["card__ingredient"]}
    >
      <Image
        src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}
        alt={name}
        boxSize="100px"
        objectFit="cover"
        borderRadius="md"
        mr={[0, 0, 3, 3]}
      />
      <Heading fontSize={{ md: "md", sm: "sm" }} marginBottom="3">
        <Link onClick={() => getRecipes(name)}>{name}</Link>
      </Heading>
    </Box>
  );
};

export default IngredientCard;

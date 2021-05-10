import React, { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";

interface Props {
  setQuery: (query: string) => void;
}

const SearchPanel: React.FC<Props> = ({ setQuery }) => {
  const [ingredient, setIngredient] = useState<string>("");

  const submitSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setQuery(ingredient);
    setIngredient("");
  };

  return (
    <form onSubmit={submitSearch}>
      <Flex marginBottom="8">
        <Input
          size="lg"
          shadow="md"
          marginRight="5"
          placeholder="Type your ingredient"
          value={ingredient}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setIngredient(e.target.value)}
        />
        <Button className={styles.btn} size="lg" colorScheme="green" type="submit">
          Search recipes
        </Button>
      </Flex>
    </form>
  );
};

export default SearchPanel;

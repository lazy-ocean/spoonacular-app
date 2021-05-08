import React, { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

interface Props {
  setQuery: (query: string) => void;
}

const SearchPanel: React.FC<Props> = ({ setQuery }) => {
  const [ingredient, setIngredient] = useState<string>("");

  const submitSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setQuery(ingredient);
  };

  return (
    <form onSubmit={submitSearch}>
      <Flex marginBottom="8">
        <Input
          size="lg"
          shadow="md"
          marginRight="5"
          placeholder="Type your ingredient"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setIngredient(e.target.value)}
        />
        <Button size="lg" colorScheme="green" type="submit">
          Search recipes
        </Button>
      </Flex>
    </form>
  );
};

export default SearchPanel;

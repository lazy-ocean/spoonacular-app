import React, { useState } from "react";
import { FormControl, Input, Button } from "@chakra-ui/react";

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
      <Input
        placeholder="Type your ingredient"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setIngredient(e.target.value)}
      />
      <Button type="submit">Search recipes</Button>
    </form>
  );
};

export default SearchPanel;

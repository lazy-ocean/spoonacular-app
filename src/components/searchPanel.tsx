import React, { useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";

interface Props {
  onChange: (value: string) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
  value: string;
}

const SearchPanel: React.FC<Props> = ({ onSubmit, onChange, value }) => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} data-cy="search-form">
      <Flex marginBottom="8">
        <Input
          size="lg"
          shadow="md"
          marginRight="5"
          placeholder="Type your ingredient"
          value={value}
          data-cy="input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onChange(e.target.value)}
        />
        <Button
          className={styles.btn}
          size="lg"
          colorScheme="green"
          type="submit"
          data-cy="input-btn"
        >
          Search recipes
        </Button>
      </Flex>
    </form>
  );
};

export default SearchPanel;

import { Box, Heading, Text, Link } from "@chakra-ui/react";

interface Props {
  lastSearchedItems: string[];
  setQuery: (query: string) => void;
}

const LastSearches: React.FC<Props> = ({ lastSearchedItems, setQuery }) => {
  const handleClick = (query: string) => {
    setQuery(query);
  };

  return (
    <Box
      bg="green.50"
      padding="2.5rem"
      borderLeftRadius="md"
      borderBottomRightRadius="none"
      borderTopRightRadius={["md", "md", "md", "none"]}
      borderBottomLeftRadius={["none", "none", "none", "md"]}
      border="1px"
      borderRight={["1px", "1px", "1px", 0]}
      borderBottom={[0, 0, 0, "1px"]}
      borderColor={["gray.200", "gray.200", "gray.200", "gray.200"]}
      data-cy="recently-searched"
    >
      <Heading marginBottom="3" fontSize={["xl", "xl", "2xl", "3xl"]}>
        Recently searched
      </Heading>
      {lastSearchedItems.length ? (
        lastSearchedItems.map((searchedItem, i) => (
          <Text fontSize="md" key={`${searchedItem}-${i}`} paddingY="1">
            <Link
              fontSize="xl"
              onClick={() => handleClick(searchedItem)}
              data-cy="recently-searched-item"
            >
              {searchedItem}
            </Link>
          </Text>
        ))
      ) : (
        <Text fontSize="md">Try searching something!</Text>
      )}
    </Box>
  );
};

export default LastSearches;

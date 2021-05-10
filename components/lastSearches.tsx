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
    <Box bg="green.50" padding="2.5rem" borderLeftRadius="md" border="1px" borderColor="gray.200">
      <Heading marginBottom="3" fontSize={["xl", "xl", "2xl", "3xl"]}>
        Recently searched:
      </Heading>
      {lastSearchedItems.length ? (
        lastSearchedItems.map((searchedItem, i) => (
          <Text fontSize="md" key={`${searchedItem}-${i}`} paddingY="1">
            <Link href="#" fontSize="xl" onClick={() => handleClick(searchedItem)}>
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

import { Box, Heading, Text, Link } from "@chakra-ui/react";

interface Props {
  lastSearchedItems: string[];
}

const LastSearches: React.FC<Props> = ({ lastSearchedItems }) => {
  return (
    <Box bg="green.50" padding="8" borderLeftRadius="md" border="1px" borderColor="gray.200">
      <Heading marginBottom="3">Last searched:</Heading>
      {lastSearchedItems.length ? (
        lastSearchedItems.map((searchedItem, i) => (
          <Text fontSize="md" key={`${searchedItem}-${i}`} paddingY="1">
            <Link href="#" fontSize="xl">
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

import { Flex, Heading } from "@chakra-ui/react";

const Header = () => (
  <Flex width="100%" as="header" padding="1.5rem" bg="green.500" color="white" marginBottom="1rem">
    <Heading as="h1">Spoonacular App 🥄</Heading>
  </Flex>
);

export default Header;

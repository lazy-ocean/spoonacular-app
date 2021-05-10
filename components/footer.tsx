import { Flex, Heading, Link } from "@chakra-ui/react";

const Footer = () => (
  <Flex
    width="100%"
    as="footer"
    padding="1.5rem"
    bg="green.500"
    color="white"
    justifyContent="center"
  >
    <Heading as="h1" size="md">
      Made by <Link href="lazy-ocean.github.io">Vladlena Panchenko</Link>, 2021
    </Heading>
  </Flex>
);

export default Footer;

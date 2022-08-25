import {
  Flex,
  Heading,
  Input,
  Button,
  Box,
  useColorMode,
  useColorModeValue,
  Link,
  HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
//import { useSession, signOut } from 'next-auth/client';

//import classes from './main-navigation.module.css';

function MainNavigation() {
  //const [session, loading] = useSession();

  // function logoutHandler() {
  //   signOut();
  // }

  return (
    <Box bg={"blue.800"} w="100%" p={4} color="white" top={1}>
      <HStack spacing={8} alignItems={"center"}>
        <Box>Logo</Box>

        <NextLink href="/" passHref>
          <Link>
            <div>Next Auth</div>
          </Link>
        </NextLink>
        <NextLink href="/login" passHref>
          <Link>Login</Link>
        </NextLink>
        <NextLink href="/" passHref>
          <Link>Profile</Link>
        </NextLink>
        <Button colorScheme="teal" size="xs">
          Logout
        </Button>
      </HStack>
    </Box>
  );
}

export default MainNavigation;

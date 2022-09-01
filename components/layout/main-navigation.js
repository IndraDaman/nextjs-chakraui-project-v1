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
import { useSession, signOut,getSession } from "next-auth/react";

//import classes from './main-navigation.module.css';

function MainNavigation() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
console.log(session);
  function logoutHandler() {
    signOut();
  }

  return (
    <Box bg={"blue.800"} w="100%" p={4} color="white" top={1}>
      <HStack spacing={8} alignItems={"center"}>
        <Box>Logo</Box>

        {session && (
          <NextLink href="/" passHref>
            <Link>
              <div>Next Auth</div>
            </Link>
          </NextLink>
        )}
        {!session && !loading && (
          <NextLink href="/login" passHref>
            <Link>Login</Link>
          </NextLink>
        )}
        {session && session.user.role =="admin" && (
          <NextLink href="/" passHref>
            <Link>Profile</Link>
          </NextLink>
        )}
        {session && (
          <Button colorScheme="teal" size="xs" onClick={logoutHandler}>
            Logout
          </Button>
        )}
      </HStack>
    </Box>
  );
}

export default MainNavigation;

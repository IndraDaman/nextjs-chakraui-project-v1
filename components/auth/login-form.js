import {
    Flex,
    Heading,
    Input,
    Button,
    Box,
    useColorMode,
    useColorModeValue,
    Link
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { IoSunny, IoMoon } from "react-icons/io5";
  import NextLink  from "next/link";
  
  function LoginFormContent() {
    // Show Link to Login page if NOT auth
    const { toggleColorMode } = useColorMode();
    const [toggle,setToggle] = useState(false);
    const fromBackGround = useColorModeValue("blue.300", "blue.800");
    return (
      <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Flex
          direction={"column"}
          background={fromBackGround}
          padding={12}
          rounded={6}
          position={"relative"}
        >
          <Heading mb={6}>Log In</Heading>
          <Input
            placeholder="your email"
            variant={"filled"}
            mb={3}
            type="email"
          />
          <Input
            placeholder="your password"
            variant={"filled"}
            mb={3}
            type="password"
          />
          <Button colorScheme={"pink"}>
            Log in
          </Button>
          <>
          Don't have account!{" "}
          <NextLink href="/signup" passHref>
            <Link color="teal.500"> Click here to signup</Link>
          </NextLink>
        </>
          <Box
            position={"absolute"}
            top={2}
            right={2}
            onClick={() => {
              toggleColorMode();
              setToggle(!toggle);
            }}
          >
            {toggle ? <IoSunny /> : <IoMoon />}
          </Box>
        </Flex>
      </Flex>
    );
  }
  
  export default LoginFormContent;
  
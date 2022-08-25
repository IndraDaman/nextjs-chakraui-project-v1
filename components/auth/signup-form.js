import {
  Flex,
  Heading,
  Input,
  Button,
  Box,
  useColorMode,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
import NextLink  from "next/link";

function SignFormContent() {
  // Show Link to Login page if NOT auth
  const { toggleColorMode } = useColorMode();
  const [toggle, setToggle] = useState(false);
  const fromBackGround = useColorModeValue("blue.300", "blue.700");
  return (
    <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Flex
        direction={"column"}
        background={fromBackGround}
        padding={12}
        rounded={6}
        position={"relative"}
      >
        <Heading mb={6}>Sign Up</Heading>
        <Input placeholder="your name" variant={"filled"} mb={3} type="text" />
        <Input
          placeholder="your email"
          variant={"filled"}
          mb={3}
          type="email"
        />
        <Input placeholder="your phone" variant={"filled"} mb={3} type="tel" />
        <Input
          placeholder="your password"
          variant={"filled"}
          mb={3}
          type="password"
        />
        <Input
          placeholder="Confirm password"
          variant={"filled"}
          mb={3}
          type="password"
        />
        <Button colorScheme={"pink"}>Sign Up</Button>
        <>
          Already have account!{" "}
          <NextLink href="/login" passHref>
            <Link color="teal.500">Click here to login</Link>
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

export default SignFormContent;

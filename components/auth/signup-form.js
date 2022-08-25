import {
  Flex,
  Heading,
  Input,
  Button,
  Box,
  useColorMode,
  useColorModeValue,
  Link,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useState ,useRef} from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
import NextLink  from "next/link";

async function createUser(name,email,phone, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name,email,phone, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

function SignFormContent() {
  // Show Link to Login page if NOT auth
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const passwordInputRef = useRef();
  const confirPasswordInputRef = useRef();
  const { toggleColorMode } = useColorMode();
  const [toggle, setToggle] = useState(false);
  const fromBackGround = useColorModeValue("blue.300", "blue.700");
  async function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirPasswordInputRef.current.value;

    // optional: Add validation

      try {
        // console.log(enteredName);
        // console.log(enteredEmail);
        // console.log(enteredPhone);
        // console.log(enteredPassword);
        // console.log(enteredConfirmPassword);
        const result = await createUser(enteredName,enteredEmail,enteredPhone, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    
  }
  return (
    <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Flex
        direction={"column"}
        background={fromBackGround}
        padding={12}
        rounded={6}
        position={"relative"}
        w="50%"
      >
        <Heading mb={6}>Sign Up</Heading>
        <Input placeholder="your name" variant={"filled"} mb={3} type="text" ref={nameInputRef}/>
        <Input
          placeholder="your email"
          variant={"filled"}
          mb={3}
          type="email"
          ref={emailInputRef}
        />
        <Input placeholder="your phone" variant={"filled"} mb={3} type="tel" ref={phoneInputRef}/>
        <Input
          placeholder="your password"
          variant={"filled"}
          mb={3}
          type="password"
          ref={passwordInputRef}
        />
        <Input
          placeholder="Confirm password"
          variant={"filled"}
          mb={3}
          type="password"
          ref={confirPasswordInputRef}
        />
        <Button colorScheme={"pink"} onClick={submitHandler}>Sign Up</Button>
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

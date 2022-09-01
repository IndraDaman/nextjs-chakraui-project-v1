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
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

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
  const router =  useRouter();
  async function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirPasswordInputRef.current.value;

      try {
        const result = await createUser(enteredName,enteredEmail,enteredPhone, enteredPassword);
        console.log(result);
        if(result && result.status==201){
          const response =await handleAuth(enteredEmail,enteredPassword);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    
  }
  const handleAuth =  async (email,password) => {           
    signIn('credentials', {
        username:email,
        password:password,
        redirect: false
    }).then(response => {
       
        if (response.ok) {
            // Authenticate user
            router.push("/")
        } else {
          console.log(response.error);
            //setPageState(old => ({ ...old, processing: false, error: response.error }))
        }
    }).catch(error => {
        console.log(error)
        //setPageState(old => ({...old, processing: false, error: error.message ?? "Something went wrong!"}))
    })
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

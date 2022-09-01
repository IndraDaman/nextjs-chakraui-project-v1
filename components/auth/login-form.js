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
  import React, { useState } from "react";
  import { IoSunny, IoMoon } from "react-icons/io5";
  import NextLink  from "next/link";
  import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
  
  function LoginFormContent() {
    // Show Link to Login page if NOT auth
    const { toggleColorMode } = useColorMode();
    const [toggle,setToggle] = useState(false);
    const fromBackGround = useColorModeValue("blue.300", "blue.800");
    //===========================
    const router =  useRouter()
    const [authState, setAuthState] = useState({
        username: '',
        password: ''
    })
    const [pageState, setPageState] = useState({
        error: '',
        processing: false
    })

    const handleFieldChange = (e) => {
        setAuthState(old => ({ ...old, [e.target.id]: e.target.value }))
    }

    const simplifyError = (error) => {
        const errorMap = {
            "CredentialsSignin": "Invalid username or password"
        }
        return errorMap[error] ?? "Invalid username or password"
    }

    const handleAuth = async () => {
        setPageState(old => ({...old, processing: true, error: ''}))
        signIn('credentials', {
            ...authState,
            redirect: false
        }).then(response => {
           
            if (response.ok) {
                // Authenticate user
                router.push("/")
            } else {
                setPageState(old => ({ ...old, processing: false, error: response.error }))
            }
        }).catch(error => {
            console.log(error)
            setPageState(old => ({...old, processing: false, error: error.message ?? "Something went wrong!"}))
        })
    }
    //===========================
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
            onChange={handleFieldChange} value={authState.username} id='username' 
          />
          <Input
            placeholder="your password"
            variant={"filled"}
            mb={3}
            type="password" onChange={handleFieldChange} value={authState.password} id='password'
          />
          {simplifyError(pageState.error)}{" "}
          <Button colorScheme={"pink"} onClick={handleAuth}>
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
  
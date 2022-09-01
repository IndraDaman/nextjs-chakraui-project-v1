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
  
  async function updatePassword(oldPassword, newPassword) {
    const response = await fetch('/api/user/changepassword', {
      method: 'PATCH',
      body: JSON.stringify({ oldPassword,newPassword }),
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
  
  function ChangePasswordFormContent() {
    // Show Link to Login page if NOT auth

    const oldPasswordInputRef = useRef();
    const newPasswordInputRef = useRef();
    const confirPasswordInputRef = useRef();
    const { toggleColorMode } = useColorMode();
    const [toggle, setToggle] = useState(false);
    const fromBackGround = useColorModeValue("blue.300", "blue.700");
    const router =  useRouter();
    async function submitHandler(event) {
      event.preventDefault();
      const enteredOldPassword = oldPasswordInputRef.current.value;
      const enteredNewPassword = newPasswordInputRef.current.value;
      const enteredConfirmPassword = confirPasswordInputRef.current.value;
  
        try {
          const result = await updatePassword(enteredOldPassword,enteredConfirmPassword);
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
          <Heading mb={6}>Change Password</Heading>          
          <Input
            placeholder="old password"
            variant={"filled"}
            mb={3}
            type="password"
            ref={oldPasswordInputRef}
          />
          <Input
            placeholder="new password"
            variant={"filled"}
            mb={3}
            type="password"
            ref={newPasswordInputRef}
          />
          <Input
            placeholder="Confirm password"
            variant={"filled"}
            mb={3}
            type="password"
            ref={confirPasswordInputRef}
          />
          <Button colorScheme={"pink"} onClick={submitHandler}>Submit</Button>
        
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
  
  export default ChangePasswordFormContent;
  
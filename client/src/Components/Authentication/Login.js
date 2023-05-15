import React from 'react'
import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Button,
    InputGroup,
    InputRightElement  
  } from "@chakra-ui/react";
  import { useState } from "react"; 
 
const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [show,setShow] = useState(false)
    const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const handleShow = ()=>{
         setShow(!show)
      }
      const handleSubmit = ()=>{
        console.log('handleGuestSubmit working',email,password);
      }
     
  return (   
    <VStack>
      
      <FormControl isRequired >
        <FormLabel>Email</FormLabel>
        <Input type="email"
        value={email} 
        placeholder="Enter email" onChange={(e)=>{
            setEmail(e.target.value)
        }}/>
      </FormControl>  
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input type={show?"text":"password"}
        value={password} 
         placeholder="Enter password" onChange={(e)=>{
            setPassword(e.target.value)
        }}/>
        <InputRightElement 
        width="4.5rem"
        >
        <Button 
        size="sm"
         height="1.75rem"
         onClick={handleShow}
         >{show?"Hide":"Show"}</Button>
        </InputRightElement >
        </InputGroup>
      </FormControl>
      <Button colorScheme='blue' width="100%" style={{marginTop:15}} onClick={handleSubmit}>Login</Button>
      <Button colorScheme='red' width="100%" style={{marginTop:15}} onClick={()=>{
        setEmail("guest@st.com")
        setPassword("1234")
      }}>Login as Guest user</Button>
    </VStack>
  )
}

export default Login
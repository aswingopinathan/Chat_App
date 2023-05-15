import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "../../Api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading,setLoading] = useState('')
  const toast = useToast()

  const navigate = useNavigate()

  const handleShow = () => {
    setShow(!show);
  };
  const handleSubmit = async() => {
    setLoading(true)
    if(!email || !password){
      toast({
        title: 'Please fill all the fields',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      setLoading(false);
    }else{
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const {data}=await axios.post("/api/authuser",{email:email,password:password},config)

        toast({
          title: 'Credential Verified',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })

        localStorage.setItem("userInfo",JSON.stringify(data));
        setLoading(false);
        
        navigate('/chats')
       } catch (error) {
        toast({
          title: 'Error occured',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        setLoading(false);

       }
    }
  };

  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={password}
            placeholder="Enter password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button size="sm" height="1.75rem" onClick={handleShow}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}

      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@g.com");
          setPassword("1111");
        }}
      >
        Login as Guest user
      </Button>
    </VStack>
  );
};

export default Login;

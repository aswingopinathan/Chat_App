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
import React from "react";
import { useToast } from '@chakra-ui/react'
import axios from '../../Api/api'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpassword,setConfirmPassword] = useState('')

    const [pic,setPic] = useState({})

    const [loading,setLoading] = useState('')
    const [show,setShow] = useState(false)

    const toast = useToast()
    const navigate = useNavigate()
    
      const handleShow = ()=>{
         setShow(!show)
      }
      const imageUploader = (pics)=>{
       setLoading(true);
       setTimeout(() => {
        if(pics===undefined){
          toast({
            title: 'Invalid Input',
            description: "Please select an image",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
         }else if(pics.type==="image/jpeg" || pics.type==="image/png"){
           setLoading(false);
            setPic({profilePic:pics})
         }else{
          toast({
            title: 'Invalid Input Format',
            description: "Please select an image",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
          setLoading(false);
         }
       }, 5000);
      }
      const handleSubmit = async()=>{
         setLoading(true);
         if(!name || !email || !password || !confirmpassword){
          toast({
            title: 'Please fill all the fields',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
          setLoading(false);
         }else if(password!==confirmpassword){
          toast({
            title: 'Passwords do not match',
            description: "Please re-enter proper password",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
          setLoading(false);
         }else{
          
         try {
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          const {data}=await axios.post("/api/user/registeruser",{name:name,email:email,password:password,pic:pic.profilePic},config)
          
          toast({
            title: 'Form submitted',
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
            description:"Please fill all the fields",
          })
          setLoading(false);

         }
        }

      }
  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" placeholder="Enter name" onChange={(e)=>{
            setName(e.target.value)
        }}/>
      </FormControl>
      <FormControl isRequired >
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Enter email" onChange={(e)=>{
            setEmail(e.target.value)
        }}/>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input type={show?"text":"password"}
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
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
        <Input type={show?"text":"password"}
         placeholder="Re-enter password" onChange={(e)=>{
            setConfirmPassword(e.target.value)
        }}/>
        <InputRightElement width="4.5rem">
        <Button 
        size="sm"
         height="1.75rem"
         onClick={handleShow}
         >{show?"Hide":"Show"}</Button>
        </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Profile Pic</FormLabel>
        <Input type="file"
        accept="image/*"
        onChange={(e)=>{
            imageUploader(e.target.files[0])
        }}/>
      </FormControl>
      <Button colorScheme='blue'
       width="100%"
        style={{marginTop:15}}
         onClick={handleSubmit}
         isLoading={loading}
         >Sign Up</Button>
    </VStack>
  );
};

export default SignUp;

import React, { useState } from 'react'
import axios from '../Api/api'
import { useEffect } from 'react'


const ChatPage = () => {
    const [chats,setChats] = useState([]);
    
    const fetchChats = async()=>{
        const {data} = await axios.get('/api/chats') 
        console.log('data',data);
        setChats(data);

    }
    useEffect(()=>{
        fetchChats()
    },[])
  return (
    <div>
        <h1>ChatPage</h1>
        <div>{chats.map((chat)=>(
            <div key={chat._id}>{chat.chatName}</div>
        ))}</div>
    </div>
  )
}

export default ChatPage
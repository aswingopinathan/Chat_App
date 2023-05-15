const Chat = require("../models/chatModel");
const User = require("../models/userModel");

module.exports = {
  accessChat: async (req, res) => {
    try {
      const { userid, userId } = req.body;
      let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: userid } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],  
      })
        .populate("users")
        .populate("latestMessage");     

      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email",
      });

      if (isChat.length > 0) {
        res.send(isChat[0]);
      } else {
        const chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [userid, userId],
        };
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users"
        );
        res.status(200).send(FullChat);
      }
    } catch (error) {
      console.log("error", error);
    }
  },
  fetchChats: async (req, res) => {
    try {
      const { userid } = req.body;
      Chat.find({ users: { $elemMatch: { $eq: userid } } })
        .populate("users")
        .populate("groupAdmin")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      console.log("error", error);
    }
  },
  createGroupChat: async(req, res) => {
    const users = JSON.parse(req.body.users);
    if(users.length<2){
       return res.status(400)
        .send("more than 2 users required")
    }
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })
        const fullGroupChat = await Chat.findOne({_id: groupChat._id})
        .populate("users")
        .populate("groupAdmin")
        res.status(200).json(fullGroupChat)
    } catch (error) {
        console.log('error',error);
    }
  },
  addToGroup:async(req,res)=>{
    const { chatId, userId } = req.body;

    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push:{users: userId},
      },
      {new:true}
    ).populate("users")
    .populate("groupAdmin")

    if(!added){ 
      res.status(400);
    }else{
      res.json(added)
    }
  },
  removeFromGroup:async(req,res)=>{
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull:{users: userId},
      },
      {new:true}
    ).populate("users")
    .populate("groupAdmin")

    if(!removed){ 
      res.status(400);
    }else{
      res.json(removed)
    }
  }
};

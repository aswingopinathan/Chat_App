var express = require("express");
var router = express.Router();
const upload = require("../utils/multerEngine");
const chat001 = require('../data/data')
const { registerUser, searchUser, authUser } = require("../controllers/userControllers");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatController");
const {
  sendMessage,
  allMessages,
  uploadFileUsingMulter,
} = require("../controllers/messageController");


router.get("/", function (req, res, next) {
  res.send("API running");
});

router.get('/chats', function(req, res, next) {
  res.send(chat001);
  // res.send('hello');

}); 

router.get('/chats/:id', function(req, res, next) {
  // console.log(req.params.id);
  const singleChat = chats.find((c)=> c._id === req.params.id)
  res.send(singleChat)
  });

// router.post("/upload", upload.array("upload"),uploadFileUsingMulter);
// 

router.post("/registeruser",upload.array("pic"), registerUser);
router.post("/authuser", authUser);
router.get("/searchuser", searchUser);

router.post("/accesschat", accessChat);
router.get("/fetchchat", fetchChats);
router.post("/group", createGroupChat);
router.put("/groupadd", addToGroup);
router.put("/groupremove", removeFromGroup);

router.post("/sendmessage", sendMessage);
router.get("/:chatId", allMessages);
router.post("/uploadfilemulter",upload.array("uploaded_file"),uploadFileUsingMulter);

// 
module.exports = router;

var express = require("express");
var router = express.Router();
const upload = require("../utils/multerEngine");
const chat001 = require('../data/data')
const { registerUser, searchUser, authUser } = require("../controllers/userController");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageController");
const verifyToken = require('../middleware/authMiddleware')

router.get("/", function (req, res, next) {
  res.send("API running");
});

router.post("/registeruser",upload.array("pic"), registerUser);
router.post("/authuser", authUser);
router.get("/searchuser",verifyToken, searchUser);

router.post("/sendmessage", sendMessage);
router.get("/:chatId", allMessages);

module.exports = router;

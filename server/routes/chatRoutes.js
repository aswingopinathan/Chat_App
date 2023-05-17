var express = require("express");
var router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  addToGroup,
  removeFromGroup,
  renameGroup,
} = require("../controllers/chatController");

router.route("/").post(verifyToken, accessChat);
router.route("/").get(verifyToken, fetchChats);
router.route("/group").post(verifyToken, createGroupChat);
router.route("/rename").put(verifyToken,renameGroup)
router.route("/groupadd").put(verifyToken, addToGroup);
router.route("/groupremove").put(verifyToken, removeFromGroup);

module.exports = router;

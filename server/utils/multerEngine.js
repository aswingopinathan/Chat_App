const multer = require("multer");

const filestorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/data/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: filestorageEngine });

module.exports =  upload ;

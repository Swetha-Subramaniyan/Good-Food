const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../client/src/assets'));
  },
  filename: function (req, file, cb) {
    const sanitizedName = file.originalname.replace(/\s+/g, '_');
    cb(null, sanitizedName);
  }
});

const fileFilter = (req, file, cb) => {
    console.log("mime", file.mimetype)
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
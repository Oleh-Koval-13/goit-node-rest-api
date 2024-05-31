import multer from 'multer';
import path from 'node:path';

const storage = multer.diskStorage({
  destination: path.resolve('tmp'),
  filename: function (req, file, cb) {
    const suff = Math.random();
    cb(null, `${req.user._id}.${file.originalname}`);
  },
});

// console.log(path.resolve('tmp'));
export default multer({ storage });
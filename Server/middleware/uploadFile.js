const multer = require('multer');
const config = require('../config/config');
const {initializeApp} = require('firebase/app');


initializeApp(config.firebaseConfig);

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/images/')
//         // nơi lưu file
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
//     }
//     // lưu tên file
// });

const upload = multer.memoryStorage();

module.exports = multer({ storage: upload });
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'uploads/')
    },
    filename: function (req,file,cb){
        const date = Date.now()
        cb(null,file.fieldname + '-' + date + '.png')
    }
})

const upload = multer({storage:storage})

module.exports = upload;

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const date = Date.now();
//     cb(null, file.fieldname + '-' + date + '.png');
//   }
// });

// const upload = multer({ storage: storage });

// module.exports = upload;

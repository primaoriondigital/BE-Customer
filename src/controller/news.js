const { response } = require("../middleware/common");
const ModelNews = require("../model/news")
const firebase = require("../config/firebase")
const { storage } = require('../config/firebase2');
const mime = require('mime-types');
const NewsController = {
    insert: async (req,res,next) => {
        const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return res.send({ error: error });
  }

  const { originalname, buffer } = file;
  const mimeType = mime.lookup(originalname);
  const fileExtension = mime.extension(mimeType);
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  
  const today = new Date();
  const formattedDate = formatDate(today);
  const fileName = `news-${formattedDate}.${fileExtension}`;

  const snapshot = await storage
    .ref()
    .child(fileName)
    .put(buffer, { contentType: mimeType });

  const imageUrl = await snapshot.ref.getDownloadURL();

        const data = {
            judul: req.body.judul,
            penulis: req.body.penulis,
            isi: req.body.isi,
            tanggal: formattedDate,
            photo: imageUrl
        }
        try {
            const result = await ModelNews.addNews(data)
            response(res,200,true,result,"add news success")
        } catch (error) {
            response(res,404,false,error,"add news failed")
        }
    },
    getAll: async (req,res,next) =>{
        try {
            const result = await ModelNews.getNews()
            response(res,200,true,result.rows,"get all news success")
        } catch (error) {
            response(res,404,false,error,"get all news failed")
        }
    },getDetail: async (req,res,next) =>{
        try {
            const result = await ModelNews.getNewsDetailed(req.params.id)
            response(res,200,true,result.rows,"get detail news success")
        } catch (error) {
            response(res,404,false,error,"get detail news failed")
        }
    },deleteNews: async (req,res,next) =>{
        try {
            const result = await ModelNews.deleteNews(req.params.id)
            response(res,200,true,result.rows,"delete news success")
        } catch (error) {
            response(res,404,false,error,"delete news failed")
        }
    }
//     ,upload: async (req,res,next) =>{
//         try {
//             const file = req.file;
//             const storageRef = firebase.storage().ref();
//             const fileRef = storageRef.child(file.originalname);
        
//             await fileRef.put(file.buffer);
//             console.log('File berhasil diunggah ke Firebase Storage.');
//             res.send('File berhasil diunggah ke Firebase Storage.');
//           } catch (error) {
//             console.error('Terjadi kesalahan saat mengunggah file:', error);
//             res.status(500).send('Terjadi kesalahan saat mengunggah file.');
//           }
// }
}

exports.NewsController = NewsController
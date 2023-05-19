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
    },edit: async (req,res,next) => {
        function formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
          }
          
          const today = new Date();
          const formattedDate = formatDate(today);
        const data = {
            // id: req.params.id,
            judul: req.body.judul,
            tanggal: formattedDate,
            isi: req.body.isi,
            penulis: req.body.penulis
        }
        try {
            const result = await ModelNews.editNews(data,req.params.id) 
            console.log('Data judul:', data.judul);
            console.log('Data tanggal:', data.tanggal);
            console.log('Data isi:', data.isi);
            console.log('Data penulis:', data.penulis);
            response(res,200,true,{result,data},"edit news success")
        } catch (error) {
            response(res,404,false,error,"edit news failed")
        }
    },
    // edit2: async (req, res, next) => {
    //     const file = req.file;
    //     if (!file) {
    //       const error = new Error('Please upload a file');
    //       error.httpStatusCode = 400;
    //       return res.send({ error: error });
    //     }
      
    //     const { originalname, buffer } = file;
    //     const mimeType = mime.lookup(originalname);
    //     const fileExtension = mime.extension(mimeType);
    //     function formatDate(date) {
    //       const day = String(date.getDate()).padStart(2, '0');
    //       const month = String(date.getMonth() + 1).padStart(2, '0');
    //       const year = date.getFullYear();
    //       return `${day}-${month}-${year}`;
    //     }
        
    //     const today = new Date();
    //     const formattedDate = formatDate(today);
    //     const fileName = `news-${formattedDate}.${fileExtension}`;
      
    //     const snapshot = await storage
    //       .ref()
    //       .child(fileName)
    //       .put(buffer, { contentType: mimeType });
      
    //     const imageUrl = await snapshot.ref.getDownloadURL();
      
    //     const { judul, isi, penulis } = req.body;
      
    //     const data = {
    //       judul,
    //       isi,
    //       penulis,
    //       photo: imageUrl
    //     };
      
    //     try {
    //       const result = await ModelNews.editNews2(data, req.params.id);
      
    //       if (result) {
    //         // Fetch the updated row after the update
    //         const updatedRow = await ModelNews.getNewsDetailed(req.params.id);
      
    //         // Send response with the updated row
    //         return response(res, 200, true, updatedRow, "Edit news success");
    //       } else {
    //         return response(res, 404, false, null, "Row not found");
    //       }
    //     } catch (error) {
    //       return response(res, 500, false, error, "Edit news failed");
    //     }
    //   }
      
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
edit2 : async (req, res, next) => {
    const uploadImage = (file) => {
        return new Promise((resolve, reject) => {
          const { originalname, buffer } = file;
          const mimeType = mime.lookup(originalname);
          const fileExtension = mime.extension(mimeType);
          function formatDate(date) {
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
          }
      
          const today = new Date();
          const formattedDate = formatDate(today);
          const fileName = `news-${formattedDate}.${fileExtension}`;
      
          const snapshot = storage.ref().child(fileName).put(buffer, { contentType: mimeType });
      
          snapshot.then((snapshot) => {
            snapshot.ref.getDownloadURL().then((imageUrl) => {
              resolve(imageUrl);
            });
          }).catch((error) => {
            reject(error);
          });
        });
      };
    const file = req.file;
    const { judul, isi, penulis } = req.body;
    const data = {};
  
    if (judul) {
      data.judul = judul;
    }
  
    if (isi) {
      data.isi = isi;
    }
  
    if (penulis) {
      data.penulis = penulis;
    }
  
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        data.photo = imageUrl;
      } catch (error) {
        return response(res, 500, false, error, "Error uploading image");
      }
    }
  
    try {
      const result = await ModelNews.editNews2(data, req.params.id);
  
      if (result) {
        const updatedRow = await ModelNews.getNewsDetailed(req.params.id);
        return response(res, 200, true, updatedRow.rows, "Edit news success");
      } else {
        return response(res, 404, false, null, "Row not found");
      }
    } catch (error) {
      return response(res, 500, false, error, "Edit news failed");
    }
  ;
}
}

exports.NewsController = NewsController
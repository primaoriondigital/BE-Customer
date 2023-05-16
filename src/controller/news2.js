const { storage } = require('../config/firebase2');
const mime = require('mime-types');

exports.uploadImage = async function (req, res) {
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

  // Render image on HTML page
  return res.send(`
    <html>
      <body>
        <img src="${imageUrl}">
      </body>
    </html>
  `);
};

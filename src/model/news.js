const Pool = require("./../config/db");

const addNews = (data) => {
    const {judul,isi,penulis,tanggal,photo} = data
    return new Promise((resolve, reject) => {
        Pool.query(`INSERT INTO "news" (judul,isi,penulis,tanggal,photo) VALUES('${judul}','${isi}','${penulis}','${tanggal}','${photo}')`,(err,result)=>{
            if(!err){
                resolve(result)
            } else { 
                reject(err)
            }
        })
    })
}

const getNews = () => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM "news"`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const getNewsDetailed = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM "news" WHERE id=${id}`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const deleteNews = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "news" judul= WHERE id=${id}`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const editNews = (data,id) => {
    const {judul,isi,penulis,tanggal,photo} = data
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "news" SET judul = '${judul}',isi = '${isi}',penulis = '${penulis}',tanggal = '${tanggal}',photo = '${photo}' WHERE id = ${id}`,(err,result)=>{
            if(!err){
                resolve(result)
            } else { 
                reject(err)
            }
        })
    })
}

const editNews2 = (data, id) => {
    const { judul, isi, penulis, photo } = data;
    const updateFields = [];
  
    if (judul) {
      updateFields.push(`judul = '${judul}'`);
    }
  
    if (isi) {
      updateFields.push(`isi = '${isi}'`);
    }
  
    if (penulis) {
      updateFields.push(`penulis = '${penulis}'`);
    }
  
    if (photo) {
      updateFields.push(`photo = '${photo}'`);
    }
  
    const updateQuery = `UPDATE "news" SET ${updateFields.join(', ')} WHERE id = ${id}`;
  
    return new Promise((resolve, reject) => {
      Pool.query(updateQuery, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  };
  
  

module.exports = {addNews,getNews,getNewsDetailed,deleteNews,editNews2}
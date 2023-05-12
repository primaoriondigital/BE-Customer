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

module.exports = {addNews,getNews,getNewsDetailed}
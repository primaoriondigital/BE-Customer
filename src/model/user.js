const Pool = require("./../config/db");

const findPhone = (phone) => {
    return new Promise ((resolve,reject)=>
        Pool.query(`SELECT * FROM "user_customer" where phone = ${phone}`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
    }))
}

const findName = (email) => {
    return new Promise ((resolve,reject)=>
        Pool.query(`SELECT * FROM "user_customer" where email ='${email}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
    }))
}


const addUser = (data) => {
    const {id,name,phone,password,email,refeal_code,otp} = data
    return new Promise((resolve, reject) => {
        Pool.query(`INSERT INTO "user_customer" (id,name,password,phone,email,referral_code,otp) VALUES('${id}','${name}','${password}',${phone},'${email}','${refeal_code}','${otp}')`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const verif = (data) => {
    const {email} = data
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "user_customer" SET auth=1 WHERE email='${email}'`,(err,result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const findId = (data) => {
    const {id} = data
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM "user_customer" WHERE id='${id}'`,(err,result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const editPoint = (data) => {
    const {id,point} = data
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "user_customer" SET point = point + ${point} WHERE id = '${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else { 
                reject(err)
            }
        })
    })
}

module.exports = {findName,addUser,verif,findId,findPhone,editPoint}
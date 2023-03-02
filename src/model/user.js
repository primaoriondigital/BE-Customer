const Pool = require("./../config/db");

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
    const {id,name,phone,role,password,email,photo_user,refeal_code,address,point,member,otp} = data
    return new Promise((resolve, reject) => {
        Pool.query(`INSERT INTO "user_customer" (id,name,password,phone,role,email,photo_user,refeal_code,address,point,member,otp) VALUES('${id}','${name}','${password}',${phone},'${role}','${email}','${photo_user}','${refeal_code}','${address}','${point}','${member}','${otp}')`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {findName,addUser}
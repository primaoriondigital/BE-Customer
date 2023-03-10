const Pool = require("./../config/db");

const addNotification = (data) => {
    const {transaction_status,order_id,fraud_status} = data
    return new Promise((resolve, reject) => {
        Pool.query(`INSERT INTO "notification" (order_id,transaction_status,fraud_status) VALUES('${order_id}','${transaction_status}','${fraud_status}')`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const getNotif = (order_id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT transaction_status FROM "notification" where order_id='${order_id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}
module.exports = {addNotification,getNotif}
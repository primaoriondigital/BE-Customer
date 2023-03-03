const Pool = require("./../config/db");

const addOrder = (data) => {
    const {customer_id,service,time,payment_status,review,order_status,address,created_at} = data
    return new Promise((resolve, reject) => {
        Pool.query(`INSERT INTO "order" (customer_id,payment_status,service,time,review,order_status,address,created_at) VALUES('${customer_id}','${payment_status}','${service}','${time}','${review}','${order_status}','${address}',NOW())`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {addOrder}
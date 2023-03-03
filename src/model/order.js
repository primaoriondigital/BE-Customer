const Pool = require("./../config/db");

const addOrder = (data) => {
    const {customer_id,service,time,address} = data
    return new Promise((resolve, reject) => {
        Pool.query(`INSERT INTO "order" (customer_id,payment_status,service,time,order_status,address,created_at) VALUES('${customer_id}','unpayment','${service}','${time}','waiting for cleaner','${address}',NOW())`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {addOrder}
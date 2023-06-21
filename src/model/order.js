const Pool = require("./../config/db");

const addOrder = (data) => {
    const {customer_id,service,time,address,order_id,gross_amount,item_name,notes,voucher} = data
    return new Promise((resolve, reject) => {
        Pool.query(`INSERT INTO "order" (order_id,customer_id,payment_status,service,time,order_status,address,created_at,gross_amount,item_name,notes,voucher) VALUES('${order_id}','${customer_id}','Unpayment','${service}','${time}','Waiting for Payment','${address}',NOW(),'${gross_amount}','${item_name}','${notes}','${voucher}')`,(err,result)=>{
            if(!err){
                resolve("bisa masukin",result)
            } else { 
                reject(err)
            }
        })
    })
}

const payOrder = (id) => {
    // const {id,status} = data
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "order" SET payment_status='paid' WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                console.log("ini data model",id)
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const readyToBook = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "order" SET order_status='Ready to Book' WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const Urgent = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "order" SET order_status='Open' WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const findOrder = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM "order" WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const writeCleaner = (data) => {
    const {id,cleaner_id} = data
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "order" SET order_status='Get Cleaner',cleaner_id='${cleaner_id}' WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const writeStatusArea = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "order" SET order_status='approved area' WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const writeStatusCleaner = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "order" SET order_status='approved cleaner' WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const writeStatusRejectedCleaner = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "order" SET order_status='rejected cleaner' WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}


const writeOrderDone = (data) => {
    const {id} = data
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "order" SET order_status='Done' WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const historyOrder = (data) => {
    const {customer_id} = data
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM "order" WHERE customer_id='${customer_id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const cancelOrder = (id) => {
    // const {id} = data
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "order" SET order_status='Cancel' WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const reviewOrder = (data) => {
    const {review,id,rating} = data
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "order" SET review='${review}',rating='${rating}' WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const findOrderCleanerName = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT *,"user".name as cleaner_name,"user".photo_user as cleaner_photo FROM "order" INNER JOIN "user" ON "user".id = "order".cleaner_id WHERE "order".order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

// const uploadPhoto = (order_id,status
//     ,photo
//     ) => {
//     // const {order_id,status,photo} = data
//     return new Promise((resolve, reject) => {
//         Pool.query(`INSERT INTO "review2" (order_id,status
//             ,photo
//             ) VALUES('${order_id}','${status}'
//             ,'${photo}'
//             )`,(err,result)=>{
//             if(!err){
//                 resolve(result)
//             } else { 
//                 reject(err)
//             }
//         })
//     })
// }


const uploadPhoto = (
    data
    // order_id,status
    ) => {
    const {order_id,status
        // ,photo
    } = data
    return new Promise((resolve, reject) => {
        Pool.query(`INSERT INTO "review2" (order_id,status
            ) VALUES('${order_id}','${status}'
            )`,(err,result)=>{
            if(!err){
                resolve(result)
            } else { 
                reject(err)
            }
        })
    })
}

const uploadPhotoAlone = (photo) => {
    return new Promise((resolve, reject) => {
        Pool.query(`INSERT INTO "review2" (photo) VALUES('${photo}')`,(err,result)=>{
            if(!err){
                resolve(result)
            } else { 
                reject(err)
            }
        })
    })
}


module.exports = {uploadPhotoAlone,uploadPhoto,addOrder,payOrder,readyToBook,Urgent,findOrder,writeCleaner,writeOrderDone,writeStatusCleaner,writeStatusArea,historyOrder,cancelOrder,reviewOrder,writeStatusRejectedCleaner,findOrderCleanerName}
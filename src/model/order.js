const Pool = require("./../config/db");

const addOrder = (data) => {
    const {customer_id,service,time,address,order_id,gross_amount} = data
    return new Promise((resolve, reject) => {
        Pool.query(`INSERT INTO "order" (order_id,customer_id,payment_status,service,time,order_status,address,created_at,gross_amount) VALUES('${order_id}','${customer_id}','unpayment','${service}','${time}','waiting for payment','${address}',NOW(),'${gross_amount}')`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const payOrder = (data) => {
    const {id} = data
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "order" SET payment_status='paid' WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const readyToBook = (data) => {
    const {id} = data
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "order" SET order_status='ready to book' WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const Urgent = (data) => {
    const {id} = data
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "order" SET order_status='open' WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const findOrder = (data) => {
    const {id} = data
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
        Pool.query(`UPDATE "order" SET order_status='get cleaner',cleaner_id='${cleaner_id}' WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

const writeStatusArea = (data) => {
    const {id} = data
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

const writeStatusCleaner = (data) => {
    const {id} = data
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


const writeOrderDone = (data) => {
    const {id} = data
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "order" SET order_status='done' WHERE order_id='${id}'`,(err,result)=>{
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

const cancelOrder = (data) => {
    const {id} = data
    return new Promise((resolve, reject) => {
        Pool.query(`UPDATE "order" SET order_status='cancel' WHERE order_id='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}
module.exports = {addOrder,payOrder,readyToBook,Urgent,findOrder,writeCleaner,writeOrderDone,writeStatusCleaner,writeStatusArea,historyOrder,cancelOrder}
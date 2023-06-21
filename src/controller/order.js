const { response } = require("../middleware/common");
const multer = require('multer')
const sharp = require('sharp')
const ModelOrder = require("../model/order")
const {v4: uuidv4} = require('uuid');
const midtransClient = require('midtrans-client');
let snap = new midtransClient.Snap({
    isProduction : true,
    serverKey : 'Mid-server-fSXfq48YsUrXRKaA_ZbPQgjy',
    clientKey : 'Mid-client-gY8gmA1KcEZdl03l'
});

const upload = multer({
    fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb( new Error('Please upload a valid image file'))
    }
    cb(undefined, true)
    }
    })

const OrderController = {
    insert: async (req,res,next) => {
        let digits = "0123456789";
        let order_id = "";
        for (let i = 0; i < 6; i++) {
            order_id += digits[Math.floor(Math.random() * 10)];
        }
        // const order_id = uuidv4()
        const gross_amount = req.body.gross_amount
        const address = req.body.address
        const customer_id = req.body.customer_id
        const email = req.body.email
        const name = req.body.name
        const item_name = req.body.item_name
        const phone = req.body.phone
        // const address = req.body.address
        const data = {
            order_id,
            customer_id,
            service : req.body.service,
            address,
            time : req.body.time,
            gross_amount,
            item_name,
            notes : req.body.notes,
            voucher : req.body.voucher
        }
        // const ini = `${order_id}`
        // const lanjut= console.log("ini lanjut")
        const result = await ModelOrder.addOrder(data)
        const link = console.log("ini berhasil")
        const parameter = {
            "transaction_details": {
                "order_id": `${order_id}`,
                "gross_amount": `${gross_amount}`
            }, "item_details" : [{
                "name" : `${item_name}`,
                "price" : `${gross_amount}`,
                "quantity" : 1
            }],
            "customer_details": {
                "first_name": `${name}`,
                "email": `${email}`,
                "phone" : `${phone}`,
                "billing_address": {
                    "address" : `${address}`
                }
            },
            // "enabled_payments": ["gopay","permata_va"],
            // "callbacks": {
            //     "finish": link
            // },
            "page_expiry": {
                "duration":30,
                "unit": "minutes"
            }
        }
    try {snap.createTransaction(parameter)
        .then((transaction)=>{
            // transaction token
            var transactionToken = transaction.token;
            console.log('transactionToken:',transactionToken);
            
            // transaction redirect url
            const transactionRedirectUrl = transaction.redirect_url;
            console.log('transactionRedirectUrl:',transactionRedirectUrl);
            response(res,200,true,data,`${transactionRedirectUrl}`)
        })
        .catch((e)=>{
            console.log('Error occured:',e.message);
        });
            // const text = `"${result}+${transactionToken}+${transactionRedirectUrl}"`
            // response(res,200,true,result,"order success")

        } catch (error) {
            console.log(error)
        response(res,404,false,error,"order fail")
        }
    }, pay: async (req,res,next) => {
        const data = {
            id: req.body.order_id,
            status: req.body.transaction_status
        }
        let order =ModelOrder.findOrder(req.body.order_id)
        console.log("ini order",order)
        // if (data.status === "settlement")
        // if (order.service === 'booking'){
        //     await ModelOrder.readyToBook(data.id)
        //     console.log("tahap ini 1")
        // } else {
        //     await ModelOrder.Urgent(data.id)
        //     console.log("tahap ini 2")
        // }
        try { 
            const result = ModelOrder.payOrder(data)
            response(res,200,true,result,"payment success")
        } catch (error) {
            console.log(error)
            response(res,404,false,error,"please pay your order")
        }
    }, getCleaner: async (req,res,next) => {
        const data = {
            id : req.params.id,
            cleaner_id: req.body.cleaner_id
        }
        try {
            const result = await ModelOrder.writeCleaner(data)
            response(res,200,true,result,"get cleaner success")
        } catch (error) {
            response(res,404,false,error,"get cleaner fail")
        }
    },approvedArea: async (req,res,next) => {
        const data = {
            id : req.params.id,
        }
        try {
            const result = await ModelOrder.writeStatusArea(data)
            response(res,200,true,result,"get cleaner success")
        } catch (error) {
            response(res,404,false,error,"get cleaner fail")
        }
    },approvedCleaner: async (req,res,next) => {
        const data = {
            id : req.params.id,
        }
        try {
            const result = await ModelOrder.writeStatusCleaner(req.params.id)
            response(res,200,true,result.command,"order cleaner accepted")
        } catch (error) {
            response(res,404,false,error,"order cleaner rejected")
        }
    },orderDone: async (req,res,next) => {
        const data = {
            id : req.params.id,
        }
        try {
            const result = await ModelOrder.writeOrderDone(data)
            response(res,200,true,result.command,"order done")
        } catch (error) {
            response(res,404,false,error,"order not done")
        }
    }, orderDetail: async (req,res,next) => {
        const data = {
            id : req.params.id,
        }
        try {
            const result = await ModelOrder.findOrder(req.params.id)
            response(res,200,true,result.rows,"get order success")
        } catch (error) {
            response(res,404,false,error,"get order fail")
        }
    }, getHistory: async (req,res,next) => {
        const data = {
            customer_id : req.params.customer_id,
        }
        try {
            const result = await ModelOrder.historyOrder(data)
            response(res,200,true,result.rows,"get order success")
        } catch (error) {
            response(res,404,false,error,"get order fail")
        }
    }, Cancel: async (req,res,next) => {
        const data = {
            id : req.params.id,
        }
        try {
            const result = await ModelOrder.cancelOrder(data)
            response(res,200,true,result.rows,"order cancel success")
        } catch (error) {
            response(res,404,false,error,"order cancel fail")
        }
    }, 
    Review: async (req,res,next) => {
        const data = {
            id : req.params.id,
            review : req.body.review,
            rating : req.body.rating
        }
        const result = await ModelOrder.reviewOrder(data)
        try {
            response(res,200,true,data,"order review success")
        } catch (error) {
            response(res,404,false,error,"order cancel fail")
        }
    },orderRejectedCleaner: async (req,res,next) => {
        const data = {
            id : req.params.id,
        }
        try {
            const result = await ModelOrder.writeStatusRejectedCleaner(req.params.id)
            response(res,200,true,result.command,"order rejected cleaner")
        } catch (error) {
            response(res,404,false,error,"order cleaner rejected")
        }
    },orderDetailTracking: async (req,res,next) => {
        // const data = {
        //     id : req.params.id,
        // }
        try {
            const result = await ModelOrder.findOrderCleanerName(req.params.id)
            response(res,200,true,result.rows,"get order success")
        } catch (error) {
            response(res,404,false,error,"get order fail")
        }
    },Photo: async (req,res,next) => {
        try {
            // const Port = process.env.PORT
            // const Host = process.env.HOST
            // const photo = req.file.filename
            // const uri = `http://${Host}:${Port}/image/${photo}`
            const data = {
            //     req.body.photo = uri
            order_id : req.body.order_id,
            status : req.body.status
            }
            const result = await ModelOrder.uploadPhoto(
                data
                // req.body
                )
            response(res,200,true,result,"get order success")
        } catch (error) {
            response(res,404,false,error,"get order fail")
        }
    },inputPhoto: async (req,res,next) => {
        try {
            await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(__dirname + `/images/${req.file.originalname}`)
            res.status(201).send('Image uploaded succesfully')
        } catch (error){
            console.log(error)
            res.status(400).send(error)
        }
    }
}

exports.OrderController = OrderController;


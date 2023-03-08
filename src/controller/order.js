const { response } = require("../middleware/common");
const ModelOrder = require("../model/order")
const {v4: uuidv4} = require('uuid');
const midtransClient = require('midtrans-client');
let snap = new midtransClient.Snap({
    isProduction : false,
    serverKey : 'SB-Mid-server-_cL8JNy6MGc-IOePF9J0amYW',
    clientKey : 'SB-Mid-client-MmH0YcC1XzyHoQdZ'
});

const OrderController = {
    insert: async (req,res,next) => {
        var order_id = uuidv4()
        const gross_amount = req.body.gross_amount
        const address = req.body.address
        const customer_id = req.body.customer_id
        const data = {
            order_id,
            customer_id,
            service : req.body.service,
            address,
            time : req.body.time,
            gross_amount
        }
        // const ini = `${order_id}`
        // const lanjut= console.log("ini lanjut")
        const link = console.log("ini berhasil")
        const parameter = {
            "transaction_details": {
                "order_id": `"${order_id}"`,
                "gross_amount": `${gross_amount}`
            },"customer_details": {
                "first_name": `"${address}"`,
            },"enabled_payments": ["gopay","shopeepay"],
            // "callbacks": {
            //     "finish": link
            // },
            "page_expiry": {
                "duration":5,
                "unit": "minutes"
            },
            "callbacks": {"finish": "http://localhost:5000/order/paid"}
        }
    try {snap.createTransaction(parameter)
        .then((transaction)=>{
            // transaction token
            var transactionToken = transaction.token;
            console.log('transactionToken:',transactionToken);
            
            // transaction redirect url
            const transactionRedirectUrl = transaction.redirect_url;
            console.log('transactionRedirectUrl:',transactionRedirectUrl);
            response(res,200,true,transactionRedirectUrl,"order success")
        })
        .catch((e)=>{
            console.log('Error occured:',e.message);
        });
            const result =ModelOrder.addOrder(data)
            // const text = `"${result}+${transactionToken}+${transactionRedirectUrl}"`
            // response(res,200,true,result,"order success")

        } catch (error) {
            console.log(error)
        response(res,404,false,error,"order fail")
        }
    }, pay: async (req,res,next) => {
        const data = {
            id: req.query.order_id    
        }

        // const data1 = data.replace(2,3)
        // const nilai = data1.split("")
        // console.log("order id : ",data1)
        let {rows:[order]} =await ModelOrder.findOrder(data)
        console.log("ini order",order)
        if (order.service === 'booking'){
            await ModelOrder.readyToBook(data)
            console.log("tahap ini 1")
        } else {
            await ModelOrder.Urgent(data)
            console.log("tahap ini 2")
        }
        try { 
            
            const result = await ModelOrder.payOrder(data)
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
            const result = await ModelOrder.writeStatusCleaner(data)
            response(res,200,true,result,"get cleaner success")
        } catch (error) {
            response(res,404,false,error,"get cleaner fail")
        }
    },orderDone: async (req,res,next) => {
        const data = {
            id : req.params.id,
        }
        try {
            const result = await ModelOrder.writeOrderDone(data)
            response(res,200,true,result,"get cleaner success")
        } catch (error) {
            response(res,404,false,error,"get cleaner fail")
        }
    }, orderDetail: async (req,res,next) => {
        const data = {
            id : req.params.id,
        }
        try {
            const result = await ModelOrder.findOrder(data)
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
    }, Lanjut: async (req,res,next) => {
        try {
            
        } catch (error) {
            
        }
    }
}

exports.OrderController = OrderController;


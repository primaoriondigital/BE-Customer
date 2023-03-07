const { response } = require("../middleware/common");
const ModelOrder = require("../model/order")

const OrderController = {
    insert: async (req,res,next) => {
        const data = {
            customer_id : req.body.customer_id,
            service : req.body.service,
            address : req.body.address,
            time : req.body.time,
        }
        try {
            const result = await ModelOrder.addOrder(data)
            response(res,200,true,data,"order success")

        } catch (error) {
            console.log(error)
        response(res,404,false,error,"order fail")
        }
    }, pay: async (req,res,next) => {
        const data = {
            id: req.params.id
        }
        let {rows:[order]} = await ModelOrder.findOrder(data)
        if (order.service === 'booking'){
            await ModelOrder.readyToBook(data)
        } else {
            await ModelOrder.Urgent(data)
        }
        try { 
            console.log(order)
            const result = await ModelOrder.payOrder(data)
            response(res,200,true,result.data,"payment success")
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
    }
}

exports.OrderController = OrderController;

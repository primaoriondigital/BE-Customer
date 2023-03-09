const { response } = require("../middleware/common");
const MidtransModel = require("../model/midtrans")

const MidtransController = {
    insert: async (req,res,next) => {
        const data = {
            order_id : req.body.order_id,
            fraud_status : req.body.fraud_status,
            transaction_status: req.body.transaction_status
        }
        try {
            const result = await MidtransModel.addNotification(data)
            console.log(data)
            response(res,200,true,result,"payment success")
        } catch (error) {
            console.log(error)
            response(res,404,false,error,"please pay your order")
        }
    }
}

exports.MidtransController = MidtransController
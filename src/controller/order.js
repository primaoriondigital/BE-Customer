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
    }
}

exports.OrderController = OrderController;

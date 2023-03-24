const { response } = require("../middleware/common");
const MidtransModel = require("../model/midtrans")
const ModelOrder = require("../model/order")

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
    },
    status: async (req,res,next) => {
        var result1 = await MidtransModel.getNotif(req.params.order_id)
        var {rows:[hasil2]} = await ModelOrder.findOrder(req.params.order_id)
        if (result1.rows[0]) {
            var message = ("silahkan dibayar")
            if(result1.rows[1]){
                console.log("ayo dibayar")
                var message = result1.rows.transaction_status
                if (result1.rows[1].transaction_status === 'expire'){
                    var message = "pembayaran expired"
                    await ModelOrder.cancelOrder(req.params.order_id)
                } else {
                    var message = "sudah membayar"
                    await ModelOrder.payOrder(req.params.order_id)
                    if (hasil2.service === 'Booking'){
                        await ModelOrder.readyToBook(req.params.order_id)
                        console.log("tahap booking driver")
                    } else {
                        await ModelOrder.Urgent(req.params.order_id)
                        console.log("tahap open driver")
                    }
                }
            }
                
        } else {
            var message = ("silahkan mencoba membayar")
        }
        try {
            response(res,200,true,hasil2,message)
        } catch (error) {
            response(res,404,false,error,"tidak ada percobaan pembayaran")
        }
    }
}

exports.MidtransController = MidtransController
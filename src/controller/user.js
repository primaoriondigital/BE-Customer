const { response } = require("../middleware/common");
const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const {generateToken} = require('../middleware/auth')
const ModelUser = require("../model/user")

const UsersController = {
    register: async (req,res,next) => {
        // let acak = ""
        let digits = "0123456789ABCDEFG";
        let otp = "";
        for (let i = 0; i < 6; i++) {
          otp += digits[Math.floor(Math.random() * 10)];
        }
        function makeid(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
              counter += 1;
            }
            return result;
        }
        
        console.log();
    let data = {
        id : uuidv4(),
        name : req.body.name,
        password : bcrypt.hashSync(req.body.password),
        phone : req.body.phone,
        role : req.body.role,
        member : req.body.member,
        email : req.body.email,
        photo_user : req.body.photo_user,
        refeal_code : makeid(5),
        address : req.body.address,
        point : req.body.point,
        otp,

    }
    try {
        const result = await ModelUser.addUser(data)
        if (result){
            console.log(result)
            response(res,200,true,true,"register success")
        }
    } catch (err){
        console.log(err)
        response(res,404,false,err,"register fail")
    }
    },
    login: async (req,res,next)=>{
        console.log('email',req.body.email)
        console.log('password',req.body.password)
        let {rows:[user]} = await ModelUser.findName(req.body.email)
        if(!user){
            return response(res, 404, false, null," email not found")
        }
        const password = req.body.password
        const validation1 = bcrypt.compareSync(password,user.password)
        if(!validation1){
            return response(res, 404, false, null,"wrong password")
        }
        delete user.password
        let payload = {
            id: user.id,
            fullname: user.name,
            email: user.email,
            role: user.role
        }
        user.token = generateToken(payload)
        response(res, 200, false, user,"login success")
    }
}

exports.UsersController = UsersController;

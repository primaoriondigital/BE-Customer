const { response } = require("../middleware/common");
const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const {generateToken} = require('../middleware/auth')
const ModelUser = require("../model/user")
const email = require('../middleware/email2')
// import { send_mail } from "../middleware/email2";


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
        let {rows:[user]} = await ModelUser.findName(req.body.email)
        if (user) {
            return response(res, 404, false, "email already use", " register fail");
          }
        const password1 = req.body.password
        const password2 = req.body.confirm
        if (password1 !== password2) {
            return response(res, 404, false, null, "password tidak sesuai")
        }
    const data = {
        id : uuidv4(),
        name : req.body.name,
        password : bcrypt.hashSync(req.body.password),
        phone : req.body.phone,
        email : req.body.email,
        refeal_code : makeid(5),
        otp,
    }
    const validate = await email.send_mail(`${data.name}`,`${data.email}`,`${data.otp}`)
    if(validate) {
        console.log('menjalankan validate')
    } else {
        console.log('tidak menjalankan validate')
    }
    try {
        const result = await ModelUser.addUser(data)
        if (result){
            console.log(result)
            response(res,200,true,true,"register success")
        }
        // if (result) {
        //     console.log(result);
        //     let sendEmail = await email(
        //       otp
        //     );
        //     if (sendEmail == "email not sent!") {
        //       return response(res, 404, false, null, "register fail");
        //     }
        //     response(
        //       res,
        //       200,
        //       true,
        //       { email: data.email },
        //       "register success please check your email"
        //     );
        //   }
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
        if(user.auth!==1){
            return response(res,404,false,null,"account belum diverifikasi")
        }
        const password = req.body.password
        const validation1 = bcrypt.compareSync(password,user.password)
        if(!validation1){
            return response(res, 404, false, null,"wrong password")
        }
        let payload = {
            id: user.id,
            fullname: user.name,
            email: user.email,
            role: user.role
        }
        user.token = generateToken(payload)
        response(res, 200, false, user,"login success")
    },verification: async(req,res,next) => {
        let {rows:[user]} = await ModelUser.findName(req.body.email)
        // if(!user){
        //     return response(res, 404, false, null," email not found")
        // }
        const {otp} = req.body
        const data = {
            email : req.body.email
        }
        if (user.otp == otp) {
            const result = await ModelUser.verif(data)
            response(res,200,true,result,"verification account success")
        } else {
            return response(res, 404, false, null,"verification account fail")
        }
        
    },getProfileDetail: async(req,res,next) => {
        try {
            const data = {
                id : req.params.id
            }
            const result = await ModelUser.findId(data)
            response(res,200,true,result.rows,"get profile success")
        } catch (error) {
            console.log(error)
            response(res,404,false,error,"get profile fail")
        }

    }
}

exports.UsersController = UsersController;

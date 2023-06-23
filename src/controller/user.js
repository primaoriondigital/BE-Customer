const { response } = require("../middleware/common");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const {generateToken} = require('../middleware/auth')
const ModelUser = require("../model/user")
const axios = require('axios');
const user_mongo = require('../model/user_mongo')
// const fetch = require('node-fetch');
const email = require('../middleware/email2')
// import { send_mail } from "../middleware/email2";

mongoose.connect('mongodb+srv://kilapin:Ifvu1ovfqbhXFTRE@cluster0.oucnaua.mongodb.net/kilapin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UsersController = {
    register: async (req,res,next) => {
        // let acak = ""
        let digits = "0123456789";
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
            // email1 : req.body.email,
            // phone : req.body.phone
        let {rows:[user]} = await ModelUser.findName(req.body.email)
        let {rows:[user1]} = await ModelUser.findPhone(req.body.phone)
        if (user || user1) {
            return response(res, 404, false, "Email/Phone already use", "Email/Phone already use");
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
    try {
        const result = await ModelUser.addUser(data)
        const newUser = new user_mongo({
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            role: 'Kilapin Customer'
        })
        const result2 = await newUser.save()
        if (result2) {
            console.log('bisa masuk mongo')
        } else {
            console.log('belum masuk mongo')
        }
        response(res,200,true,result,"register success")
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
        response(res, 200, false, (user.id),"login success")
    },verification: async(req,res,next) => {
        let {rows:[user]} = await ModelUser.findName(req.body.email)
        if(!user){
            return response(res, 404, false, null," email not found")
        }
        console.log(user)
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
        
    },verificationWeb: async(req,res,next) => {
        let {rows:[user]} = await ModelUser.findPhone(req.params.phone)
        if(!user){
            return response(res, 404, false, null," user not found")
        } else {
            const data = {
                email : user.email
            }
            console.log(user)
            const result = ModelUser.verif(data)
            response(res,200,true,user.email,"verification account success")
        }
        // console.log(user)
        // if (user.otp == otp) {
        //     const result = await ModelUser.verif(data)
        //     response(res,200,true,result,"verification account success")
        // } else {
        //     return response(res, 404, false, null,"verification account fail")
        // }
        
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

    },putPoint: async(req,res,next) => {
        try {
            const data = {
                id : req.params.id,
                point : req.body.point
            }
            const result = await ModelUser.editPoint(data)
            if (result) {
                const data = {
                    id: req.params.id
                }
                var updatedUser = await ModelUser.findId(data)
            }
            response(res,200,true,updatedUser.rows,"edit point success")
        } catch (error) {
            console.log(error)
            response(res,404,false,error,"edit point fail")
        }
    },deleteUser: async(req,res,next) => {
        try {
            const data = {
                id : req.params.id
            }
            const result = await ModelUser.delUser(data)
            if (result) {
                const data = {
                    id: req.params.id
                }
                var updatedUser = await ModelUser.findId(data)
            }
            response(res,200,true,updatedUser.rows,"delete user success")
        } catch (error) {
            console.log(error)
            response(res,404,false,error,"delete user fail")
        }
    },changePass: async(req,res,next) => {
        try {
            const data = {
                phone : req.params.phone,
                password : bcrypt.hashSync(req.body.password)
            }
            const result = await ModelUser.editPass(data)
            if (result) {
                // const data = {
                //     id: req.params.id
                // }
                // var updatedUser = await ModelUser.findId(data)
                response(res,200,true,result.command,"Change Password Success")
            }
            else {
            response(res,404,false,user,"Tidak Ada Akun dengan Nomor Tersebut")
            }
            // response(res,200,true,user,"get user success")
        } catch (error) {
            console.log(error)
            response(res,404,false,error,"Ini Error")
        }
    },checkPhone: async (req,res,next) => {
        try {
            let {rows:[user1]} = await ModelUser.findPhone(req.params.phone)
            if (user1) {
            const phone = req.params.phone;

// Data dan header untuk POST request
const data = {
    content: ['Kilapin Apps'],
    msisdn: `62${phone}`,
    lang_code: 'en',
    time_limit: '300'
};
const headers = {
    accept: 'application/json',
    'App-ID': 'b2d6dc1a-e725-4063-b764-1821de8d623e',
    'API-Key': 'VGE74784/xZP9hENjU18ifDY0mLvuMuW',
    'content-type': 'application/json'
};
try {
    // Lakukan POST request ke endpoint lain
    const response = await axios.post('https://api.verihubs.com/v1/whatsapp/otp/send', data, { headers });

    // Kirim respons ke client
    res.json(response.data);
} catch (error) {
    // Kirim error jika ada
    res.status(500).json({ error: error.toString() });
}
            response(res,200,true,result,"Change Password Success")
            } else {
            response(res,404,false,user1,"Tidak Ada Akun dengan Nomor Tersebut")
            }
        } catch (error) {
            response(res,404,false,error,"Ini Error")
        }
    }, checkOTP: async(req,res,next) => {
        try {
            const data = {
                msisdn: `62${req.params.phone}`,
                otp: req.params.otp
            }

            const headers = {
                accept: 'application/json',
                'App-ID': 'b2d6dc1a-e725-4063-b764-1821de8d623e',
                'API-Key': 'VGE74784/xZP9hENjU18ifDY0mLvuMuW',
                'content-type': 'application/json'
            };
            const result  = await axios.post('https://api.verihubs.com/v1/whatsapp/otp/verify', data, {headers})
            // response(res,200,true,result,"result OKE")
            res.json(result.data);

            // const result = await 
        } catch (error) {
            response(res,404,false,error,"ini error guys")
        }
    }, changeProfile: async(req,res,next) => {
        try {
            var data = {
                photo: req.body.photo,
                id:req.params.id
            }
            const result = await ModelUser.putProfile(data)
            if (result) {
                var updatedUser = await ModelUser.findId(data.id)
            }
            response(res,200,true,updatedUser.row,"Change Password Success")
        } catch (error) {
            response(res,404,false,error,"ini error guys")
        }
    }
}

exports.UsersController = UsersController;

// const phone = req.params.phone;

// // Data dan header untuk POST request
// const data = {
//     content: ['Kilapin Apps'],
//     msisdn: `62${phone}`,
//     lang_code: 'en',
//     time_limit: '300'
// };
// const headers = {
//     accept: 'application/json',
//     'App-ID': 'b2d6dc1a-e725-4063-b764-1821de8d623e',
//     'API-Key': 'VGE74784/xZP9hENjU18ifDY0mLvuMuW',
//     'content-type': 'application/json'
// };

// try {
//     // Lakukan POST request ke endpoint lain
//     const response = await axios.post('https://api.verihubs.com/v1/whatsapp/otp/send', data, { headers });

//     // Kirim respons ke client
//     res.json(response.data);
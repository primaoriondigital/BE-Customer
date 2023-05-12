const { response } = require("../middleware/common");
const ModelNews = require("../model/news")
const NewsController = {
    insert: async (req,res,next) => {
        const data = {
            judul: req.body.judul,
            isi: req.body.isi,
            tanggal: req.body.tanggal,
            photo: req.body.photo
        }
        try {
            const result = await ModelNews.addNews(data)
            response(res,200,true,result,"add news success")
        } catch (error) {
            response(res,404,false,error,"add news failed")
        }
    },
    getAll: async (req,res,next) =>{
        try {
            const result = await ModelNews.getNews()
            response(res,200,true,result.rows,"get all news success")
        } catch (error) {
            response(res,404,false,error,"get all news failed")
        }
    },getDetail: async (req,res,next) =>{
        try {
            const result = await ModelNews.getNewsDetailed(req.params.id)
            response(res,200,true,result.rows,"get detail news success")
        } catch (error) {
            response(res,404,false,error,"get detail news failed")
        }
    }

}

exports.NewsController = NewsController
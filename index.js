const express = require('express')
const { response } = require("./src/middleware/common");
require("dotenv").config();
const bodyParser = require('body-parser')
const morgan = require("morgan")
const cors = require('cors')
// const send_mail = require('./src/middleware/email2')

const app = express()
const mainRouter = require("./src/routes/index")

app.use(morgan("dev"))

app.use(bodyParser.json())

const corsOptions = {
  origin: 'http://localhost:3000', // ganti dengan URL frontend Anda
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))


app.use("/", mainRouter)
app.use("/image", express.static('./Image'))

app.all("*",(req,res,next) => {
  response(res,404,false,null,"404 Not Found")
})
app.get("/", (req, res, next) => {
  res.status(200).json({ status: "success", statusCode: 200 });
});

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



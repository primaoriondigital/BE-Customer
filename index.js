const express = require('express')
const { response } = require("./src/middleware/common");
require("dotenv").config();
const bodyParser = require('body-parser')
const morgan = require("morgan")

const app = express()
const mainRouter = require("./src/routes/index")

app.use(morgan("dev"))

app.use(bodyParser.json())

app.use("/", mainRouter)
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

console.log(makeid(5));
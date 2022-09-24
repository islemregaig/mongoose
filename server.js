const express=require("express")
const { mongoose } = require("mongoose")
const app=express()
//CONNECT DATABASE WITH SERVER
const mongoUrl="mongodb+srv://islem:islem123@workshop.8qprafd.mongodb.net/?retryWrites=true&w=majority"
//parse data
app.use(express.json());
app.use("/contacts",require("./route/routecontact"))
mongoose.connect(mongoUrl ,(err)=>{
err ? console.log(err) :console.log("database is connected")   
})

const port=5000
app.listen(port,(err)=>{
err ? console.log(err) :console.log("server is running on  port 5000")
})
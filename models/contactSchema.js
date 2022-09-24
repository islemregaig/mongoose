
const mongoose=require("mongoose")
const Schema=mongoose.Schema ;
const contactSchema=new Schema(
    [
    {

        Name: {
         type:"String" ,
         required:true
        },
        age: "Number",
        
        favoritefoods:[String],
    }]
)
module.exports=mongoose.model("contactperson",contactSchema)
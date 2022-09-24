const express=require("express")
const router=express.Router()
const contact=require("../models/contactSchema")
 //Create and Save a Record of a Model @post
router.post("/newcontact",(req,res)=>{
    let newcontact=new contact(req.body)
    newcontact.save((err,data)=>
    {
    err ? console.log(err) :res.send("contact was added")  
    })
});

    //Create Many Records with model.create()

    var CreateManyPeople=function(arrayOfPeople,done) {
        contact.Create (arrayOfPeople,(err,data)=>err? console.log(err) : done (null,data));
        
    };
    router.post('/add/manyPerson', (req,res)=>{
        CreateManyPeople (req.body,(err,data)=>{
            err? console.log(err) : res.send('manycontact was created')
        } )
    })
    
    
    
    //Use model.find() to Search Your Database 
    router.get('/:Name',(req,res)=> {
        contact.find({Name:req.params.Name},(err,data)=> { 
            err ?  console.log(err) : res.json(data)
        })
    })
    
    
    
        //Use model.findOne() to Find just one person (argument food as a search key.) 
    router.get('/getfavorite/:favoritefoods',(req,res)=> {
        console.log('get favorite')
        contact.findOne({favoritefoods: {$elemMatch:{$eq:req.params.favoritefoods}} },(err,data)=> { 
            err ?  console.log(err) : res.json(data)
        })
    }) 
    
    
    
        //Use model.findById()
    router.get('/getid/:id' , (req,res)=>{
        contact.findById({_id:req.params.id},(err,data)=>{
            err? console.log(err) : res.json(data)
        })
    })
    
    
    
        //Perform Classic Updates by Running Find, Edit, then Save
    
    router.put('/:id',async (req,res)=>{
        
        try{
            var foodToAdd = 'hamburger';
            const data=await contact.findById(req.params.id)
            data.favoritefoods=[...data.favoritefoods,foodToAdd]
            const result= await  data.save()
            res.status(200).json(result)
            }
            catch(err){
                res.status(400).json({error:err})
            }
    })
    
    
    
        //Find a person by Name and set the person's age to 20 Using model.findOneAndUpdate()
    
    router.put('/update/:name',(req,res)=> {
    
        var ageToSet = 20;
        contact.findOneAndUpdate({Name:req.params.Name},{$set: {"age":ageToSet}},{returnNewDocument : true}, function(err, doc){
        if(err){return console.log("Something wrong when updating record!");}
        res.json(doc);                  
        })
    })  
    
    
    
        //Delete One Document Using model.findByIdAndRemove
    
    router.delete('/:id' , (req,res) =>{
        contact.findByIdAndDelete({_id:req.params.id},(err,data)=> {
            err? console.log(err) : res.send('contact was deleted ')
        })
    })
    
    
    
        // Delete Many Documents with model.remove
    
    router.delete('/removeNames/:name',(req,res)=> {
        contact.remove({Name:req.params.Name},(err,data)=> { 
            err ?  console.log(err) : res.send('all contact named mary were deleted')
        })   
    })
    
    
    
        //Chain Search Query Helpers to Narrow Search Results
    
        router.get('/',(req,res)=> {
        var foodToSearch = "pizza";
        contact.find({favoritefoods:{$elemMatch:{$eq:foodToSearch }}})
        .sort({Name : "desc"})
        .limit(2)
        .select("-age")
        .exec((err, data) => {
            if(err)
            return  console.log(err);
        res.json(data)
        })
    })

module.exports=router


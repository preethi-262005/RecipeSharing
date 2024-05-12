const exp=require('express')
const userApp=exp.Router()
const {createUserOrAuthor,userOrAuthorLogin}=require('./Util')
const expressAsynHandler=require('express-async-handler')
const verifyToken=require('../Middlewares/verifyToken')
let usersCollection;
let recipeCollection;
userApp.use((req,res,next)=>{
    usersCollection=req.app.get('usersCollection')
    recipeCollection=req.app.get('recipeCollection')
    next()
})

//define routes
//user creation
userApp.post('/user',expressAsynHandler(createUserOrAuthor))

//user login
userApp.post('/login',expressAsynHandler(userOrAuthorLogin))


// read articles of all authors
userApp.get('/recipe',expressAsynHandler(async(req,res)=>{
    //get all articles of all authors
    const recipeList=await recipeCollection.find({status:true}).toArray()
    res.send({message:"All recipe",payload:recipeList})

}))


//write comment for an article by its artioclesID
userApp.post('/comment/:recipeId',expressAsynHandler(async(req,res)=>{

        //get articleId from url
       const recipeIdFromURL=(+req.params.recipeId);
        //get comment obj from req
        const userComment=req.body;
        console.log(userComment)
        //add usercomment obj as an element to comments array of article document
        await recipeCollection.updateOne({recipeId:recipeIdFromURL},{$addToSet:{comments:userComment}})
        //send res
        res.send({message:"User comment added"})

}))

//export userApp
module.exports=userApp;
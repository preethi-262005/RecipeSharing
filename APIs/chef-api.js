const exp=require('express')
const chefApp=exp.Router()
const {createUserOrAuthor,userOrAuthorLogin}=require('./Util')
const expressAsyncHandler=require('express-async-handler')
const verifyToken=require('../Middlewares/verifyToken')

let chefCollection;
let recipeCollection;
chefApp.use((req,res,next)=>{
    chefCollection=req.app.get('chefCollection')
    recipeCollection=req.app.get('recipeCollection')
    next()
})

//define routes
chefApp.post('/chef',expressAsyncHandler(createUserOrAuthor) )
//author login
chefApp.post('/login',expressAsyncHandler(userOrAuthorLogin) )

//to save new article
chefApp.post('/new-recipe',expressAsyncHandler(async(req,res)=>{
    //get new article from client
    const newrecipe=req.body;
    //save new Article to articles collection
    await recipeCollection.insertOne(newrecipe)
    //send res
    res.send({message:"New recipe added"})
}))

//read artcles by author's username
chefApp.get('/recipe/:username',expressAsyncHandler(async(req,res)=>{
    //get author's username from url
    const usernameOfChef=req.params.username;
    //get articles of current author
    const recipeList=await recipeCollection.find({username:usernameOfChef,status:true}).toArray()
    //send res
    res.send({message:"Recipes",payload:recipeList})
}))


//edit article
chefApp.put('/recipe',expressAsyncHandler(async(req,res)=>{

        //get modified article
        const modifiedArticle=req.body;
        console.log(modifiedArticle)
       let articleAfterModification= await recipeCollection.findOneAndUpdate({recipeId:modifiedArticle.recipeId},{$set:{...modifiedArticle}},{returnDocument:'after'})
       console.log(articleAfterModification)
        res.send({message:"Recipe modified",payload:articleAfterModification})

}))

//delete article(soft delete)
chefApp.put('/recipe/:recipeId',expressAsyncHandler(async(req,res)=>{
    let article=req.body;
    await recipeCollection.updateOne({recipeId:article.recipeId},{$set:{...article}})
    res.send({message:"Recipe deleted"})
}))


//export userApp
module.exports=chefApp;
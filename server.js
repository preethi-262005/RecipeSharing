const exp = require("express");
const app = exp();
const path = require("path");
require("dotenv").config();
//add body parser middleware
app.use(exp.json());
//place react build in http web server
app.use(exp.static(path.join(__dirname, '../frontend/build')));



const mongoClient = require("mongodb").MongoClient;

//connect tp mongodb server
mongoClient
  .connect(process.env.DB_URL)
  .then((client) => {
    //get database object
    const DBobj = client.db("cook");
    //create collection objects
    const usersCollection = DBobj.collection("users");
    const chefCollection = DBobj.collection("chef");
    const recipeCollection = DBobj.collection("recipe");

    //share collection objs with APIs
    app.set("usersCollection", usersCollection);
    app.set("chefCollection", chefCollection);
    app.set("recipeCollection", recipeCollection);
    console.log("DB connection success");
  })
  .catch((err) => {
    console.log("Err in DB connect", err);
  });

//import apis
const userApp = require("./APIs/user-api");
const chefApp = require("./APIs/chef-api");


//handover req to specific route based on starting of path
app.use("/user-api", userApp);
app.use("/chef-api", chefApp);


//deals with page refresh
app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
})
//error handling middeware
app.use((err, req, res, next) => {
  res.send({ status: "error", message: err.message });
});

//get port number from env
const port = process.env.PORT || 3100;

//assign port number to http server
app.listen(port, () => console.log(`http server on port ${port}`));
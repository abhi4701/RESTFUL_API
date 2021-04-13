const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

//Mongodb Setup
mongoose.connect('mongodb://localhost:27017/widiDB',{ useNewUrlParser: true ,useUnifiedTopology: true} );

//Create Schema for Articles.
const articleSchema=new mongoose.Schema({
    title:String,
    content: String
})

const Article=mongoose.model("Article",articleSchema);
//TODO

app.route("/articles")
   .get((req,res)=>{
    Article.find((err,result)=>{
        if(err){
            res.send("Error in Getting data from the Database.");
        }else{
           res.send(result);
        }
    })})
   .post((req,res)=>{
    
    const newArticle=new Article({
        title: req.body.title,
        content:req.body.content
    })

    newArticle.save((err)=>{
     if(!err){
             res.send("Successfully Added to the Database");
           }else{
               res.send(err);
           }
    })});
 
  app.route("/articles/:articleTitle")
  .get((req,res)=>{
     
    Article.findOne({title:req.params.articleTitle},(err,foundArticle)=>{
        if(foundArticle){
            res.send(foundArticle);
        }else{
            res.send("No Articles Matching this name!");
        }
    });

  });

  

app.listen(3000, function() {
  console.log("Server started on port 3000");
});




//Get- Fetch all the articles from the Dataabse.
//post- Create One new Articles.
//Put-Replace a Data with a whole new one.
//Patch- Replace the data with Some part the Data which is eror or wrong.
//Delete- Delete Data from the database.

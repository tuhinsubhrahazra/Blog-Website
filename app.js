const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require('mongoose');


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect('mongodb+srv://Tuhin:tuhindata890@cluster0.tb05w.mongodb.net/blogsDB');

let blogschema = mongoose.Schema({
    Title : String,
    Text : String
});

let Blog = mongoose.model("Blogs",blogschema);

let port = process.env.PORT;

if(port==null || port==""){
    port = 3000;
}

app.listen(port ,function(){
    console.log("Server is runnning at port 3000");
});

app.get("/",function(req,res){
    Blog.find(function(err,elements){
        if(!err){
            res.render("home" ,{hdayList: elements});
        }else{
            console.log(err);
        }
    });
});

app.get("/about",function(req,res){
    res.render("about");
});

app.get("/contact",function(req,res){
    res.render("contact");
});

app.get("/addblog",function(req,res){
    res.render("addblog");
}); 

app.post("/addblog",function(req,res){
    let BlogTitle = req.body.blogTitle;
    let BlogPost = req.body.mytextblog;

    let blog = new Blog({
        Title : BlogTitle,
        Text : BlogPost
    }).save();

    res.redirect("/");
});

app.get("/posts/:urlName",function(req,res){
    var reqUrl = _.lowerCase(req.params.urlName);
    Blog.findOne({Title : req.params.urlName} , function(err,element){
        if(!err){
            if(element){
                res.render("posts",{
                    blogTitle : element.Title,
                    blogtext : element.Text
                });
            }
            else{
                res.render("pagenotfound");
            }
        }
        else console.log(err);
    });

    // blogList.forEach(function(post){
    //     let p = _.lowerCase(post.Title);
    //     if(p === reqUrl){
    //         res.render("posts",{
    //             blogTitle : post.Title,
    //             blogtext : post.Post
    //         });
    //         boolean = true;
    //     }
    // });
    // if(!boolean) 
});
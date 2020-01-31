//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
//const truncate = require("truncate-html");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// get method for home route
app.get("/", function(req, res){

  res.render("home", {
    homeDesc : homeStartingContent,
    myPosts : posts
  });

});

// about page - get method
app.get("/about", function(req, res) {
  res.render("about", {aboutDesc : aboutContent});
});

// this is your get method for the contact page
app.get("/contact", function(req, res){
  res.render("contact", {contactDesc : contactContent});
});

// this is your get method for the compose page
app.get("/compose", function(req, res){
  res.render("compose");
});

// get method to grab the urls - this is a feature supplied by express
app.get("/posts/:newPost", function(req, res) {
  
  const reqParamsPostName = req.params.newPost;

  // our posts container, let's loop through it
  // btw the "post" var below is a local iterator 
  posts.forEach(post => {
    
    // let's convert the req params post title to lower case using lodash
    const reqParamLowerCase = _.lowerCase(reqParamsPostName);
    //console.log("Req param lowe case is: " + reqParamLowerCase);
    
    // let's convert the post title to lower case
    const postTitleLowerCase = _.lowerCase(post.title);
    //console.log("Actual post title lower case is: " + postTitleLowerCase);

    if (postTitleLowerCase === reqParamLowerCase) {
      
      console.log("bug is related to sending ejs headers/footers repeatedly");
      console.log("also for some reason it takes you to the post if it's the first one");

      // if there is a match, you take the user to the post's individual page
      res.render("post", {
        titleOfPost : post.title,
        contentOfPost : post.content
      });
    }
    // else what.....
    else {
      res.send("That post does not exist...");
    }

  });
});

// good old post method to handle input from the form
app.post("/compose", function(req, res){
  // gonna have to use body parser here
  // probs a better idea to then export to a separate module

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody 
  };

  posts.push(post);

  // take them back to the home page
  res.redirect("/");

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

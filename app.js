require("dotenv").config(); //new
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passwordReset = require("./Routes/passwordReset"); //new
const routes = require('./Routes/signup'); 
const users = require('./Routes/users');  //new
const courses = require('./Routes/ViewCourse');
const app = express();
const port = 3000;
const MongoURI = 
'mongodb+srv://Pedri:Pedri@cluster0.7oxvhwk.mongodb.net/?retryWrites=true&w=majority' ;

mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
// mohamed2a

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use(courses);
app.use("/api/users", users); //new
app.use("/api/password-reset", passwordReset); //new
///app.use("/password-reset", passwordReset);
// app.use(errorHandler)
//test again

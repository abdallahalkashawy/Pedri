const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const routes = require('./Routes/signup');
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
app.use(errorHandler)
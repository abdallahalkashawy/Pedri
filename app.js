const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const selectcountry = require('./routes/selectcountry');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/routes', require('./routes/selectcountry'));


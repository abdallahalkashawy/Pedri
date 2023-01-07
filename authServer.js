require("dotenv").config();
const NewUser = require('./model/NewUser.js');
const RefreshToken = require('./model/RefreshToken.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require("express");
const app = express();

const jwt = require('jsonwebtoken');


const MongoURI = 
'mongodb+srv://Pedri:Pedri@cluster0.7oxvhwk.mongodb.net/?retryWrites=true&w=majority' ;
mongoose.set('strictQuery',false);
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
 app.listen(4000, () => {
    console.log(`Listening to requests on http://localhost:4000`);
  })
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/token', async (req, res) => {
    const UserName = req.body.UserName;
    const refreshToken =await RefreshToken.findOne({UserName : UserName}).then((result)=>{
        return result.Token
        });
    if (refreshToken == null) return res.sendStatus(401)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.send(refreshToken);
      const accessToken = generateAccessToken(user)
      res.json({ accessToken: accessToken })
    })
  })

app.post('/login', async (req, res) => {
    const { UserName, Password } = req.body;
    try{
        const user = await NewUser.login(UserName, Password);
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign({UserName :user.UserName}, process.env.REFRESH_TOKEN_SECRET);
        RefreshToken.create({UserName : user.UserName,Token : refreshToken});
        res.send(user.UserName);
        // res.json({ accessToken: accessToken, refreshToken: refreshToken })
    }
    catch(err){
        res.status(400).send(err);
    }
});

app.get('/viewcookie', (req, res) => {
    // Get the refresh token from the cookie
    res.cookie("name","George");
    res.send("Cookie sent");
});

app.get('/get-refresh-token', (req, res) => {
    // Get the refresh token from the cookie
    const refreshToken = req.cookies.refresh_token;
    res.send(`Refresh token: ${refreshToken}`);
  });

function generateAccessToken(user) {
    return jwt.sign({UserName : user.UserName}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
  }




  
// app.post('/login', (req, res) => {
//     // Authenticate User
//     const username = req.body.username
//     const user = { name: username }
  
//     const accessToken = generateAccessToken(user)
//     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
//     refreshTokens.push(refreshToken)
//     res.json({ accessToken: accessToken, refreshToken: refreshToken })
//   })


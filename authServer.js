require("dotenv").config();
const NewUser = require('./model/NewUser.js');
const RefreshToken = require('./model/RefreshToken.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require("express");
const cors = require('cors');
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

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: '', password: '' };

  // incorrect username
  if (err.message === 'incorrect username') {
    errors.username = 'That username is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}


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
        if(RefreshToken.findOne({UserName : user.UserName}) == null){
          RefreshToken.create({UserName : user.UserName,Token : refreshToken});
        }
        res.status(200).json(user);
        // res.json({ accessToken: accessToken, refreshToken: refreshToken })
    }
    catch(err){
        res.status(400).json("Incorrect username or password");
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


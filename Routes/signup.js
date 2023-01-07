const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createNewUser = require('./middleware/newuser');
const selectcountry = require('./middleware/selectcountry');
const { Administrator, validate } = require("../Model/Administrator");
const CorporateTrainee = require("../Model/CorporateTrainee");
const Instructor = require("../Model/Instructor");
const NewUser = require("../Model/NewUser");
const authenticateToken = require('./middleware/authenticatetoken');
//testing bihos branch


//convert string to int we use "parseInt()"

// to equate two types we use "==="

/*
    router.put('/update/:id', (req, res) => {
        res.json({msg: `Update contact ${req.params.id}`}); `});
*/

router.post("/addingAdmin",async(req, res)=>{
    const biho= await Administrator.findOne({UserName: req.body.UserName})
if(biho == null){
    const addAdmin=  await Administrator.create(
        {
         UserName: req.body.UserName,
        // Country: req.body.Country,
        Password: req.body.Password,
        email: req.body.email,
        Type:"Admin"
    }).catch((err)=>{
        if(err.errors.UserName){
        return res.send("must enter username");
        }
        else if(err.errors.Password){
        return res.send("must enter password");
        }
        if(err.errors.email){
            return res.send("must enter email");
            }
       
    }).then((result)=>{
     createNewUser(req.body.UserName,req.body.Password,"Admin");
    res.status(200).send(result);    
});
}
else{
        res.send("pick another username");
    }
});


router.post("/addingCorporateTrainee",async(req, res)=>{
    const biho= await CorporateTrainee.findOne({UserName: req.body.UserName})
    if(biho == null){
    const addCorporateTrainee=  await CorporateTrainee.create(
        {
         UserName: req.body.UserName,
        // Country: req.body.Country,
        Password: req.body.Password,
        Type:"CorporateTrainee"
    }).catch((err)=>{
        if(err.errors.UserName){
        res.send("must enter username");
        }
        else if(err.errors.Password){
            res.send("must enter password");
        }
    }).then((data)=>{
        res.status(200).send(data);
        createNewUser(addCorporateTrainee.UserName,addCorporateTrainee.Password,addCorporateTrainee.Type);
    })
    // res.status(200).send(addCorporateTrainee);
}
    else{
        res.send("pick another username");
    }
});




router.post("/addingInstructor",async(req, res)=>{
    const biho= await Instructor.findOne({UserName: req.body.UserName})
    if(biho==null){
  const addInstructor= Instructor.create(
    {
        UserName: req.body.UserName,
        // Country: req.body.Country,
        Password: req.body.Password,
        Type:"Instructor"
    }).catch((err)=>{
        if(err.errors.UserName){
        res.send("must enter usernamee");
        }
        else if(err.errors.Password){
        res.send("must enter password");
        }
    }).then((addInstructor)=>{
        res.status(200).send(addInstructor);
        createNewUser(addInstructor.UserName,addInstructor.Password,addInstructor.Type);
    })
}
    else{
        res.send("pick another username please");
    }
});


router.post('/guest/selectcountry', (req, res)=>{
    const country = selectcountry(req.body.country);
    res.send(country);
});

//changepass
router.put('/changepass', async (req,res) => {
 const newPass = req.body.newPass
 const id = req.body.id

 try {  
    await Administrator.findById(id,(error,updatedUser) => {
        updatedUser.Password = newPass;
        updatedUser.save();
    
    
    });
    
 } catch (err) {
    console.log(err);
 }

 res.send("updated password succuesfully");

}
);


//testing change pass method start


// router.post("/changePasss", async (req, res) => {
//     try {
//         const { error } = validate(req.body);
//         if (error) return res.status(400).send(error.details[0].message);

//         const user = await new Administrator(req.body).save();

//         res.send(user);
//     } catch (error) {
//         res.send("An error occured");
//         console.log(error);
//     }
// });

1

//end

// LOGIN
router.post('/login', async (req, res) => {
    const { UserName, Password } = req.body;
    try{
        const user = await NewUser.login(UserName, Password);
        const accessToken = jwt.sign({UserName :user.UserName,Type :user.Type },process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
        res.json(user.UserName);
    }
    catch(err){
        res.status(400).send('Invalid username/password');
    }
    
});



router.post('/authenticate', authenticateToken, (req, res) => {
    res.json(req.user);
});

router.get('')

module.exports = router;

const express = require('express');
const router = express.Router();
const selectcountry = require('./middleware/selectcountry');
const Administrator = require("../Model/Administrator");
const CorporateTrainee = require("../Model/CorporateTrainee");
const Instructor = require("../Model/Instructor");

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
        Type:"Admin"
    }).catch((err)=>{
        if(err.errors.UserName){
        return res.send("must enter username");
        }
        else if(err.errors.Password){
        return res.send("must enter password");
        }
    }).then((result)=>{
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
        res.send("must enter username");
        }
        else if(err.errors.Password){
        res.send("must enter password");
        }
    }).then((addInstructor)=>{
        res.status(200).send(addInstructor);
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

module.exports = router;

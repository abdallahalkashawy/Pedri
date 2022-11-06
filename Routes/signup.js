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
    const addAdmin=  await Administrator.create(
        { UserName: req.body.Name,
        Country: req.body.Country,
        Password: req.body.Password,
        Type:"Admin"
    });

     
    res.status(200).send(addAdmin);
});


//jjj
router.post("/addingCorporateTrainee",async(req, res)=>{
    const addTrainee=  await CorporateTrainee.create(
        { UserName: req.body.Name,
        Country: req.body.Country,
        Password: req.body.Password,
        Type:"CorporateTrainee"
                   
    });

     
    res.status(200).send(addTrainee);
});



router.post("/addingInstructor",async(req, res)=>{
    const addInstructor=  await Instructor.create(
        { UserName: req.body.Name,
        Country: req.body.Country,
        Password: req.body.Password,
        Type:"Instructor"
    });

     
    res.status(200).send(addInstructor);
});





router.post('/guest/signup', (req, res)=>{
    const country = selectcountry(req.body.country);
    res.send(country);
})
module.exports = router;

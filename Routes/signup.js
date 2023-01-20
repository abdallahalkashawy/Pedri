require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createNewUser = require("./middleware/newuser");
const selectcountry = require("./middleware/selectcountry");
const { Administrator, validate } = require("../Model/Administrator");
const IndividualTrainee = require("../Model/IndividualTrainee");
const CorporateTrainee = require("../Model/CorporateTrainee");
const Instructor = require("../Model/Instructor");
const NewUser = require("../Model/NewUser");
const RefreshToken = require("../Model/RefreshToken");
const authenticateToken = require("./middleware/authenticatetoken");
//testing bihos branch

//convert string to int we use "parseInt()"

// to equate two types we use "==="

/*
    router.put('/update/:id', (req, res) => {
        res.json({msg: `Update contact ${req.params.id}`}); `});
*/

router.post("/addingAdmin", async (req, res) => {
  const biho = await Administrator.findOne({ UserName: req.body.UserName });
  if (biho == null) {
    const addAdmin = await Administrator.create({
      UserName: req.body.UserName,
      // Country: req.body.Country,
      Password: req.body.Password,
      email: req.body.email,
      Type: "Admin",
    })
      .catch((err) => {
        if (err.errors.UserName) {
          return res.send("must enter username");
        } else if (err.errors.Password) {
          return res.send("must enter password");
        }
        if (err.errors.email) {
          return res.send("must enter email");
        }
      })
      .then((result) => {
        createNewUser(req.body.UserName, req.body.Password, "Admin");
        res.status(200).send(result);
      });
  } else {
    res.send("pick another username");
  }
});

router.post("/addingCorporateTrainee", async (req, res) => {
  const biho = await CorporateTrainee.findOne({ UserName: req.body.UserName });
  if (biho == null) {
    const addCorporateTrainee = await CorporateTrainee.create({
      UserName: req.body.UserName,
      // Country: req.body.Country,
      Password: req.body.Password,
      Type: "CorporateTrainee",
    })
      .catch((err) => {
        if (err.errors.UserName) {
          res.send("must enter username");
        } else if (err.errors.Password) {
          res.send("must enter password");
        }
      })
      .then((data) => {
        res.status(200).send(data);
        createNewUser(
          addCorporateTrainee.UserName,
          addCorporateTrainee.Password,
          addCorporateTrainee.Type
        );
      });
  } else {
    res.send("pick another username");
  }
});

router.post("/addingInstructor", async (req, res) => {
  const biho = await Instructor.findOne({ UserName: req.body.UserName });
  if (biho == null) {
    const addInstructor = Instructor.create({
      UserName: req.body.UserName,
      Password: req.body.Password,
    })
      .catch((err) => {
        if (err.errors.UserName) {
          res.send("must enter usernamee");
        } else if (err.errors.Password) {
          res.send("must enter password");
        }
      })
      .then((addInstructor) => {
        res.status(200).send(addInstructor);
        createNewUser(
          addInstructor.UserName,
          addInstructor.Password,
          "Instructor"
        );
      });
  } else {
    res.send("pick another username please");
  }
});

router.post("/guest/selectcountry", (req, res) => {
  const country = selectcountry(req.body.country);
  res.send(country);
});

router.post("/individualtrainee/signup",async(req, res) => {
    try{
    const newIndividualTrainee = new IndividualTrainee({
    UserName: req.body.UserName,
    Password: req.body.Password,
    Email: req.body.Email,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Gender: req.body.Gender,
    Country: req.body.Country
    });
    await createNewUser(newIndividualTrainee.UserName, newIndividualTrainee.Password, "IndividualTrainee")
     await newIndividualTrainee.save();
    res.json(newIndividualTrainee);
    }catch(err) {
        if (err.message.includes("UserName_1")) {
            res.status(400).send("Username already exists");
        } else if(err.message.includes("Email_1")){
            res.status(400).send("Email already exists");
        }
        else{
            res.status(400).json(err);
        }
    }
});

router.post("/instructor/signup",async(req, res) => {
    try{
    const newInstructor = new Instructor({
    UserName: req.body.UserName,
    Password: req.body.Password,
    Email: req.body.Email,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Gender: req.body.Gender,
    Country: req.body.Country
    });
    await createNewUser(newInstructor.UserName, newInstructor.Password, "Instructor")
     await newInstructor.save();
    res.json(newInstructor);
    
    }catch(err) {
        if (err.message.includes("UserName_1")) {
            res.status(400).json("Username already exists");
        } else if(err.message.includes("Email_1")){
            res.status(400).json("Email already exists");
        }
        else{
            res.status(400).json(err);
        }
    }
});


//changepass
router.put("/changepass", async (req, res) => {
  const newPass = req.body.newPass;
  const id = req.body.id;

  try {
    await Administrator.findById(id, (error, updatedUser) => {
      updatedUser.Password = newPass;
      updatedUser.save();
    });
  } catch (err) {
    console.log(err);
  }

  res.send("updated password succuesfully");
});

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

//end

// LOGIN

module.exports = router;

const express = require('express');
const router = express.Router();
const course = require('../model/course');

// router.get('/user/viewcourseprice/:title', (req,res) => {
//     req.params.title
//     const price = 
//     res.status(200).send({price});
// });

router.post('/guest/addcourse', (req,res)=> {
    const newcourse =
        {
            title: req.body.title,
            instructor: req.body.instructor,
            price: req.body.price,
            rate: req.body.rate,
            Status: req.body.Status,
            Totalhours: req.body.Totalhours
        }
    course.create(newcourse);
    course.find({}).then((courses) => {
        res.status(200).send(courses);
    });
});
router.get('/viewcourse', (req,res) => {
    course.find({}).select('title rate price Totalhours -_id').exec((err, course) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(course);
        }
    });  
}); 

router.get('/fiterrate', async (req,res) => {
    try{
  
      var response = await course.aggregate([{ $match: { rate:req.body.rate}}]);
      res.send(response);
    
    }catch(error){
      res.status(500).send(error);
    }
    });
    router.get('/fiterprice', async (req,res) => {
        try{
          let pricee = req.body.price;
          var response = await course.aggregate([{ $match: { price:pricee}}]);
          res.send(response);
        
        }catch(error){
          res.status(500).send(error);
        }
        });

module.exports = router;
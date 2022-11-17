const express = require('express');
const { $lte } = require('sift');
const router = express.Router();
const course = require('../model/course');
const Instructor = require('../model/Instructor');

router.post('/guest/addcourse', (req,res)=> {
    const newcourse =
        {
            title: req.body.title,
            instructor: req.body.instructor,
            price: req.body.price,
            rate: req.body.rate,
            Status: req.body.Status,
            Totalhours: req.body.Totalhours,
            subject:req.body.subject
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
}); ;  
  //search based on instructor
  router.get('/search', async (req,res) => {
      try{
        if(req.body.subject){
          var response = await course.aggregate([{ $match: { subject:req.body.subject}}]);
          res.send(response);
        }else if(req.body.instructor){
          var repo = await course.aggregate([{$match: {instructor:req.body.instructor}}]);
          res.send(repo);
        }else if(req.body.title){
          var repoo = await course.aggregate([{$match: {title:req.body.title}}])
          res.send(repoo);
        }
      }catch(error){
        res.status(500).send(error);
      }
});
      




router.get('/fiterrate', async (req,res) => {
  try{
    if(req.body.rate && req.body.subject== null){
    var response = await course.aggregate([{ $match: { rate:req.body.rate}}]);
    res.send(response);
    }else if(req.body.subject && req.body.rate == null ){
    var response22 =await course.aggregate([{ $match: { subject:req.body.subject}}]);
    res.send(response22);
    }else if(req.body.subject && req.body.rate){
    var response1000 = await course.aggregate([{ $match: { subject:req.body.subject,rate:req.body.rate}}]);
    res.send(response1000);
    }
   
  }catch(error){
    res.status(500).send(error);
  }
  });

  router.get('/filterpriceee', async (req,res) => {
    try{
      var response99 = await course.find({price:{$lte:req.body.price}});      
      res.send(response99);    
    }catch(error){
      res.status(500).send(error);
    }
    });









    












module.exports = router;
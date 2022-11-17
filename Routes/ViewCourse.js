const express = require('express');
const { $lte } = require('sift');
const router = express.Router();
const course = require('../model/course');
const Instructor = require('../Model/Instructor');
// const Instructor = require('../model/Instructor');

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

router.get('/viewcourse_titles_rate_Totalhours', (req,res) => {
    course.find({}).select('title rate Totalhours -_id').exec((err, course) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(course);
        }
    });  
}); 
router.post('/viewcourse_price/:courseid', (req,res) => {
    course.find({_id:req.params.courseid}).select('price -_id').exec((err, course) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(course);
        }
    });
}); 

router.get('/viewallcourse_price', (req,res) => {
    course.find({}).select('price -_id').exec((err, course) => {

        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(course);
        }
    });  
}); 

router.get('/viewallInstructors', (req,res) => {
    Instructor.find({}).select().exec((err, course) => {
        if(err) {
            res.status(500).send(err);
        } else {
  
            res.status(200).send(course);
        }
    });  
  });

  router.get('/searchinst/:inid', async (req,res) => {
    course.find({instructor :req.params.inid}).select('title -_id').exec((err, course) => {
        if(err) {
            res.status(500).send(err
                );
        } else if(course != null){
            res.status(200).send(course);
        }
    });
     // ([{ $match: {instructor :req.params.inid}}]);
      
        // var response = await mine.aggregate([{ $match: { subject: req.body.subject}}]); 
        // res.send(mine);
    //   }else if(req.body.instructor){
    //     var repo = await course.aggregate([{$match: {instructor:req.body.instructor}}]);
    //     res.send(repo);
    //   }else if(req.body.title){
    //     var repoo = await course.aggregate([{$match: {title:req.body.title}}])
    //     res.send(repoo);
    //   }
    // }catch(error){
    //   res.status(500).send("error");
    // }
});


module.exports = router;
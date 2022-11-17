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

module.exports = router;
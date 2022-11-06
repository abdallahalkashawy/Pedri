const express = require('express');
const router = express.Router();
const course = require('../model/course');

// router.get('/user/viewcourseprice/:title', (req,res) => {
//     req.params.title
//     const price = 
//     res.status(200).send({price});
// });

router.post('/user/addcourse', (req,res)=> {
    const cours = course.create(
        {
            name: req.body.name
        }
    );
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

module.exports = router;
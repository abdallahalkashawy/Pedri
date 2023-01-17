const express = require('express');
const { $lte } = require('sift');
const router = express.Router();
const course = require('../Model/course');
const Instructor = require('../Model/Instructor');
const { CorporateTrainee, validate2 } = require("../Model/CorporateTrainee");
const CoursesRequested = require('../Model/CoursesRequested');
const ReportAcourse = require("../Model/ReportAcourse");
const RefundRequests = require('../Model/RefundRequests');
const IndividualTrainee = require('../Model/IndividualTrainee');

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
            subject:req.body.subject,
            Discount:"0"
        }
    course.create(newcourse);
    course.find({}).then((courses) => {
        res.status(200).send(courses);
    });
});


// router.post('registerCourse', (req,res)=> {
//     const register =
//         {

//             id:req.body._id


            
//         }
//     course.create(register);
//     course.find({}).then((courses) => {
//         res.status(200).send(courses);
//     });
// });

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

  router.get('/InstructorViewCourse/:inid', async (req,res) => {
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

/// HUSSEIN
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


///BAHAA

// router.post('/registerAcourse', async (req,res) => {  OLD one with course and user id 
//     const course = req.body
//     const id = req.body.id
//     try { 
//    const thisuser= await CorporateTrainee.findById({_id:id})
//    const course1 = await course.findById({_id:courseID.courseID})
//    thisuser.Registered_Courses.push(course1.title);
//    await CorporateTrainee.findByIdAndUpdate({_id:id},{Registered_Courses:thisuser.Registered_Courses})
//     } catch (err) {
//        console.log(err);
//     }
//     res.send("added succuesfully");
   
//    });

//used for requests from corp by admin to grant access
router.post('/registerAcourse', async (req,res) => {  
    const title = req.body.title
    const UserName = req.body.UserName
    //const Course = req.body
    try { 
   const thisuser= await CorporateTrainee.findOne({UserName:UserName})
   const course1 = await course.findOne({title:title})
   //const C = await CoursesRequested.findOne({Course:title})
   thisuser.Registered_Courses.push(course1.title);
   await CorporateTrainee.findOneAndUpdate({UserName:UserName},{Registered_Courses:thisuser.Registered_Courses})
   await CoursesRequested.findOneAndDelete({UserName:UserName},{Course:title})
    } catch (err) {
       console.log(err);
    }
    res.send("added succuesfully");
   
   });

  //admin rejects a course request coming from corporate trainee
   router.post('/rejectRequestedCourse', async (req,res) => {  
    const title = req.body.title
    const UserName = req.body.UserName
    try{
        await CoursesRequested.findOneAndDelete({UserName:UserName},{Course:title})
    }
   
    catch (err) {
       console.log(err);
    }
    res.send("Done");
   
   });

   


// router.post("/viewRegisteredCourses", async (req,res) => {
//     const id = req.body.id
//     const thisuser= await CorporateTrainee.findById({_id:id},{Registered_Courses:1})
//     res.send(thisuser);
// });

router.post("/viewRegisteredCourses", async (req,res) => {
    const UserName = req.body.UserName //this one by username instead of id
    const thisuser= await CorporateTrainee.findOne({UserName:UserName},{Registered_Courses:1})
    res.send(thisuser);
});

router.get('/fetchallCourses', (req, res) => {
    course.find()
        .then(courses => {
            res.status(200).json({
                courses: courses
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//the courses registered or not
router.post("/viewCourses", async (req,res) => { 
    const id = req.body.id
    const corporateTrainee = await CorporateTrainee.findById({_id:id},{Registered_Courses:1})
    const allCourses = await course.find();
    const registeredCourses = corporateTrainee.Registered_Courses;

    allCourses.forEach(course => {
        if (registeredCourses.includes(course.title)) {
            course.isRegistered = true;
        } else {
            course.isRegistered = false;
        }
    });
    res.send(allCourses);
});


router.post("/requestCourse",async(req, res)=>{
   
    const requestCourse= CoursesRequested.create(
      {  
        Course : req.body.Course,
        NameOfRequestor: req.body.NameOfRequestor


      }).catch((err)=>{
          if(err.errors.NameOfRequestor){
          res.send("must enter username");
          }
          else if(err.errors.Course){
          res.send("must enter course title");
          }
      }).then((requestCourse)=>{
          res.status(200).send(requestCourse);
          console.log("request sent")
      })
  });

  router.get('/ViewCourseRequests', (req, res) => {
    CoursesRequested.find()
        .then(courses => res.json(courses))
        .catch(err => res.status(404).json({ success: false }));
});

//reportacourse
router.post("/courseReport",async(req, res)=>{
   
    const addAReportedCourse= ReportAcourse.create(
      {
          UserName: req.body.UserName,
          CourseID: req.body.CourseID,
          Report_Type: req.body.Report_Type,
          Report_Description: req.body.Report_Description,
          Report_Status:"Processing"
          
      }).catch((err)=>{
          if(err.errors.Report_Type){
          res.send("must enter Report_Type");
          }
          else if(err.errors.Report_Description){
          res.send("must enter Report_Description");
          }
      }).then((addAReportedCourse)=>{
        res.status(200).send(addAReportedCourse);

      })
      
  });

          //this one for corporate trainee
  router.post("/viewReportedCourses", async (req, res) => {
    try {
        const reportedCourses = await ReportAcourse.find({ UserName: req.body.UserName });
        res.json({ reportedCourses });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
 //this for admin
router.get('/ViewCoursesReported', (req, res) => {
    ReportAcourse.find()
        .then(courses => res.json(courses))
        .catch(err => res.status(404).json({ success: false }));
});

router.post('/StatusPending', (req, res) => {
    ReportAcourse.findOneAndUpdate(
    { UserName: req.body.UserName, CourseID: req.body.CourseID },
    { $set: { Report_Status: "Pending" } },
    {new: true},
    (err, result) => {
    if (err) {
    res.send(err);
    } else {
    res.send(result);
    }
    }
    );
    });

router.post('/StatusResolved', (req, res) => {
    ReportAcourse.findOneAndUpdate(
        { UserName: req.body.UserName, CourseID: req.body.CourseID },
        { $set: { Report_Status: "Resolved" } },
        {new: true},
        (err, result) => {
        if (err) {
        res.send(err);
        } else {
        res.send(result);
        }
        }
        );
        });


router.post("/RequestRefund",async(req, res)=>{
   
    const addAReportedCourse= RefundRequests.create(
      {
          UserName: req.body.UserName,
          Course: req.body.Course,
          Price: req.body.Price,
          Reason_for_Refund: req.body.Reason_for_Refund
          
      }).catch((err)=>{
          if(err.errors.UserName){
          res.send("must enter Username");
          }
          
      }).then((addAReportedCourse)=>{
        res.status(200).send(addAReportedCourse);

      })
      
  });


  router.get('/ViewRefundRequests', (req, res) => {
    RefundRequests.find()
        .then(courses => res.json(courses))
        .catch(err => res.status(404).json({ success: false }));
});

router.post('/refundTowallet', async (req, res) => {
    const UserName = req.body.UserName;
    const Course = req.body.Course;
    const amount = req.body.amount;

    try {
      const trainee = await IndividualTrainee.findOne({ UserName: UserName });
      if (!trainee) return res.status(404).send({ message: 'User not found' });

      trainee.Wallet += parseInt(amount);
      await trainee.save();

      //Find and delete the item from RefundRequests table
      await RefundRequests.findOneAndDelete({ UserName: UserName, Course: Course });

      res.send({ message: 'Refund successful' });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
});

router.post('/RefuserefundTowallet', async (req, res) => {
    const UserName = req.body.UserName;
    const Course = req.body.Course;
    

    try {
      
      //Find and delete the item from RefundRequests table
      await RefundRequests.findOneAndDelete({ UserName: UserName, Course: Course });

      res.send({ message: 'Refund Denied' });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
});


router.post('/FollowupNote', async (req, res) => {
    const UserName = req.body.UserName;
    const CourseID = req.body.CourseID;
    const Followup =req.body.Followup;
    
    try {
  
        //Find and update the Followup_Note attribute in the ReportAcourse schema 
        await ReportAcourse.findOneAndUpdate({ UserName: UserName, CourseID: CourseID }, { $set: { Followup_Note: Followup } });
        res.send({ message: 'Followup note added successfully' });
        console.log(Followup,UserName,CourseID)
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
      
});


router.post('/setDiscountToAll', async (req, res) => {
    try {
      const Discount = req.body.Discount;
      const courses = await course.find({}); // Find all courses
      for (let course of courses) {
        if (Discount >= 0 && Discount <= 100) {
          course.Discount = Discount;
          //course.price = course.price - (course.price * (Discount / 100));
          await course.save(); // Save the updated course
        }
      }
      res.status(200).send('Discount applied successfully!');
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.post('/setDiscountToAcourse', async (req, res) => {
    try {
          const title =req.body.title  
      const Discount = req.body.Discount;
      await course.findOneAndUpdate({ title:title}, { $set: { Discount: Discount } });
      res.status(200).send('Discount applied successfully!');
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.post('/setDiscountToSeveralCourses', async (req, res) => {
    try {
        const subject =req.body.subject;
        const Discount = req.body.Discount;
        const courses = await course.find({subject:subject}); // Find all courses
        for (let course of courses) {
          if (Discount >= 0 && Discount <= 100) {
            course.Discount = Discount;
            //course.price = course.price - (course.price * (Discount / 100));
            await course.save(); // Save the updated course
          }
        }
        res.status(200).send('Discount applied successfully!');
      } catch (error) {
        res.status(500).send(error);
      }
    });
  




//UP BAHAA ////reported in 





/// HUSSIEN

router.get('/InstructorFilterCourse/:inid', async (req,res) => {
    course.find({instructor :req.params.inid , subject : req.body.subject}).select('title subject instructor-_id').exec((err, course) => {
        if(err) {
            res.status(500).send(err
                );
        } else if(course != null){
            res.status(200).send(course);
        }
    });
});

module.exports = router;
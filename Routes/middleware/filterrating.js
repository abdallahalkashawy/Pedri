const router = require("../ViewCourse");

const courses = [
    { name: "Courses in England",    rate: 1 }, //1st object
    { name: "Courses in Germany",    rate: 2 }, //2nd object
    { name: "Courses in Italy",      rate: 4 }, //3rd object
    { name: "Courses in Russia",     rate: 7 }, //4th object
    { name: "Courses in China",      rate: 9 }, //5th object
    { name: "Courses in USA",        rate: 1 }, //6th object
    { name: "Courses in Kazakhstan", rate: 7 }, //7th object
    { name: "Courses in France",     rate: 5 }, //8th object
  ];
/*
router.get('/listcourses',async(req,res) => {
  try {
    const response = await couses.find()
    res.send(response);
  } catch(error){
    res.status(500).send(error);
  } 
});
*/










/*
  const filter2 = courses.filter((obj) => {
    return obj.rate == req.body.rate;
  });
  console.log(filter2);
  returns
*/

  



router.get('/viewcourse', async (req,res) => {
try{
  const response = await course.aggregate([{ $match: {rate:req.body.rate}}]);
  res.send(response);

}catch(error){
  res.status(500).send(error);
}
});

const courses = [
    { name: "Courses in England",    prices: 15.5 }, //1st object
    { name: "Courses in Germany",    prices: 20 }, //2nd object
    { name: "Courses in Italy",      prices: 44 }, //3rd object
    { name: "Courses in Russia",     prices: 74 }, //4th object
    { name: "Courses in China",      prices: 14 }, //5th object
    { name: "Courses in USA",        prices: 12.7 }, //6th object
    { name: "Courses in Kazakhstan", prices: 10 }, //7th object
    { name: "Courses in France",     prices: 5 }, //8th object
  ];


  const selectcourse =  (req,res)=>{
    try {
        const course = req;
        if(course == null){ 
            // res.send(req.body);
            return {msg: 'Please select a course'}
        }
        const courseData = courses[course];
        // res.json(countryData.code);
        return courseData;
    }
    catch (err) {
    console.log(err)
    // res.send(err)
    }
    };
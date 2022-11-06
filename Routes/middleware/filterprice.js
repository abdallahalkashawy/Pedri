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
  /*
  const filter = courses.filter((obj) => {
    return obj.prices == 500;
  });
  console.log(filter);
  returns
  
  const filter2 = courses.filter((obj) => {
    return obj.rate == 5;
  });
  console.log(filter);
  returns
*/
  let filteredcousre = courses.filter(function (courses) {
    return course.price >= this.lower && course.price <= this.upper;
}, priceRange);
  
console.log(filteredcousre);

module.exports = viewprice;
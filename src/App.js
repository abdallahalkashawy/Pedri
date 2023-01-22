import './App.css';
//import { Video } from './components/Video';
import Axios from "axios";
import { Container } from 'react-bootstrap';
import { useState, React, useEffect } from 'react';
import NavBar from './components/NavBar';
import CourseList from './components/CourseList';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CourseDetails from './components/CourseDetails';
import SearchBar from './components/SearchBar';
import { getcourses } from './components/axios';
import CourseItem from './components/CourseItem';
import LoginForm from './LoginForm';
import FilterPrice from './components/FilterPrice';
//import CardCourse from './components/CardCourse';
function App() {

  const [courses, setcourses] = useState([])
  const [searchResults,setSearchResults] = useState([])
  const [allData, setData1] = useState(courses);

  useEffect(() =>{
    getcourses().then(json =>{
      setcourses(json)
      return json
    }).then(json => {
      setSearchResults(json)
    })
  },[])
  
  const [Data, setData] = useState([])
  const getfcourses = () => {
    Axios.get("http://localhost:3000/search?subject=efe").then(
      (response) => {
        console.log(Data);
        setData(response.data);
      }
    );
  };
  const [data, setdata] = useState([])
  const getPcourses = () => {
    Axios.get("http://localhost:3000/filterpriceee?price=3").then(
      (response) => {

        setdata(response.data)
        console.log(data)
      }
    );
  };
  const generateGenderData = () => {
    return [...new  Set(courses.map((item) => item.price))];
  }
  const handleFilterPrice = (price) => {
    const filteredData = courses.filter((item) => {
      return item.price === price;
    });
    console.log(filteredData);


    setData1(filteredData);
  };
  const generateGenderData2 = () => {
    return [...new  Set(courses.map((item) => item.rate))];
  }
  const handleFilterRate = (rate) => {
    const filteredData = courses.filter((item) => {
      return item.rate === rate;
    });
    
    console.log(filteredData);
    setData1(filteredData);
  };
  //course => course.title.includes(e.target.value)
  const generateGenderData3 = () => {
    return [...new  Set(courses.map((item) => item.instructor))];
  }

  return (
    
    <div className='font color-body'>
      <SearchBar  courses={courses} setSearchResults={setSearchResults}  prices={generateGenderData()}  onPriceFilter={handleFilterPrice} rates={generateGenderData2()} onRateFilter={handleFilterRate} instructors={generateGenderData3()}  />
      <FilterPrice  />
      <div className="col-sm-9">
          <div className="row mt-5">
            {allData.map((item) => (
              <CourseItem item={item} key={item.id} />
            ))}
          </div>
        </div>
      <NavBar  />
      
      <Container>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<CourseList searchResults={searchResults}  />} />
            <Route exact path="/course/:id" element={<CourseDetails />} />
            <Route exact path="/login"  element={LoginForm} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}
export default App;
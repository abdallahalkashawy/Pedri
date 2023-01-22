import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
export const SearchBar = ({courses,setSearchResults,price,prices,onPriceFilter,rates,rate,onRateFilter,instructors}) => {
  // const [price,setPrice] =useState("");
  const handleSubmit = (e) => e.preventDefault()
  const handleSearchChange = (e) => {
    if(!e.target.value) return setSearchResults(courses)
    const resultsArray = courses.filter(course => course.title.includes(e.target.value)||course.subject.includes(e.target.value)||course.instructor.includes(e.target.value))
    console.log(resultsArray)
    setSearchResults(resultsArray)
}
const [filters, setFilters] = useState({
  prices:"",
  rates:"",
  instructors:""
});
const handleInput = (field) => (event) => {
  const { value } = event.target;
  // setFilters(value);
  setFilters({
    ...filters,
    [field]: value,
  });

  switch (field) {
    case "price":
      onPriceFilter(value);
      break;
      case "rate":
      onPriceFilter(value);
      break;



      
  }
};
  return (
    <div>
  <header>
    <form className='search' onSubmit={handleSubmit}>
        <input 
            className='search__input'
            type="text"
            id="search"
            onChange={handleSearchChange}
        />
        <button className="search__button">
            <FontAwesomeIcon icon ={faMagnifyingGlass} />
        </button>
    </form>
  </header>
  <div className="col-sm-12 my-2" >
            <label htmlFor="price">Price</label>
            <select className="form-control" id="price" onChange={handleInput("price")} >
              {prices.map((price) => (
            <option value={price} key={price} style={{color: '#3f51b5'}}>
              {price}
            </option>
            ))}
            </select>
          </div>
          <div className="col-sm-12 my-2" >
            <label htmlFor="price">Rate</label>
            <select className="form-control" id="rate" onChange={handleInput("rate")} >
              {rates.map((rate) => (
            <option value={rate} key={rate} style={{color: '#3f51b5'}}>
              {rate}
            </option>
            ))}
            </select>
          </div>
          <div className="col-sm-12 my-2" >
            <label htmlFor="instructor">instructors</label>
            <select className="form-control" id="instructor" onChange={handleInput("instructor")} >
              {instructors.map((instructor) => (
            <option value={instructor} key={instructor} style={{color: '#3f51b5'}}>
              {instructor}
            </option>
            ))}
            </select>
          </div>




</div>

  )
}
export default SearchBar;
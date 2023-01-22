import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FilterPrice() {
  const [price, setPrice] = useState('');
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (price < 0) {
      setError('Invalid price Please enter positive price');
    } else {
      try {
        const response = await axios.get(`http://localhost:3000/filterpriceee/${price}`);
        console.log(response.data);
        setCourses(response.data);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <button type="submit">Filter Price</button>
      </form>
      {error && <p>{error}</p>}
      {courses.length > 0 && (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>{course.name} - ${course.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterPrice;

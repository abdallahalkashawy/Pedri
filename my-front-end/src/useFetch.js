import React, { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [url]);

  return { data };
};

export default useFetch;



// "Answer":[
//     {
//       "ExerciseID": "A742",
//       "ExerciseAnswer": "a",
//     },
//     {
//       "ExerciseID": "A748",
//       "ExerciseAnswer": "a",
//     },
//   ],
// }),
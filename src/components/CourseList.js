import React from "react";
import { Row} from "react-bootstrap";
import CardCourse from "./CardCourse";
const CourseList = ({searchResults}) => {
  return (

    <Row className="mt-1">
      {searchResults.length >= 1 ? 
      ( searchResults &&searchResults.map((course) => {
        return (<CardCourse key={course.id} course={course} searchResults={searchResults} />)
      })) 
      
      : <h2 className="text-center p-5"> no courses</h2>}
    </Row>
  );
};

export default CourseList;
import React from 'react';
import { Link } from 'react-router-dom';

const Perspectives = () => {
    return (
        <div className="perspectives">
            <h1>Instructor/Individual Trainee/Corporate Trainee Perspective</h1>
            <Link to="/forgot-password"><button>forgot my password</button></Link><br></br>
            <Link to="/changepass"><button>Change Password </button></Link><br></br>
            <Link to="/RegisteredCourses"><button>View Registered Courses 3</button></Link><br></br>
            <Link to="/SeePrevReported"><button>View Previously Reported Courses</button></Link> <br></br>
            <h1>Corporate Trainee Perspective</h1>
            <Link to="/RequestCourse"><button>Request a Course</button></Link><br></br>    
        </div>

    );
}

export default Perspectives;

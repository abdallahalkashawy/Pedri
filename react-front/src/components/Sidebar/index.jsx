import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link className="sidebar-link" to="/AdminAllCourses">All Courses</Link>
            <Link className="sidebar-link" to="/ViewRequests">View Requests</Link>
            <Link className="sidebar-link" to="/AdminViewReported">View Reported Courses</Link>
            <Link className="sidebar-link" to="/AdminViewRefundRequests">View Refund Requests</Link>
            
        </div>
    );
}

export default Sidebar;

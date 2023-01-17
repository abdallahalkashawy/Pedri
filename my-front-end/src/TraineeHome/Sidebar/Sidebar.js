import React from "react";
import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/authSlice";
import { unsetUser } from "../../redux/userSlice";
export default function Sidebar() {
    const dispatch = useDispatch();
    const handlelogout = () => {
        dispatch(logOut());
        dispatch(unsetUser());
    }
    return (
        <div className="sidebar">
            <ul>
            <li> <a href="/SolveExam">Solve Exam</a></li>
            <li> <a href="/ViewGrade">View all grade</a></li>
            <li> <a href="#">about</a></li>
            <li> <a href="#">contact</a></li>
            <li> <a href="/" onClick={handlelogout}>Log out</a></li>
            </ul>
        </div>
    );
}
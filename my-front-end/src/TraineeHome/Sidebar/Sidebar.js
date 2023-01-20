import React from "react";
import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/authSlice";
import { unsetUser } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
export default function Sidebar() {
    const currentUser = useSelector((state) => state.current.user);

    const dispatch = useDispatch();


    const handlerecieve = () => {
        axios.post("http://localhost:3000/individualtrainee/recievecerftifcate", {
            UserName : currentUser.UserName,
            Type : currentUser.Type
        },{"content-type" : "application/json"}).then((res) => {
            Swal.fire({
                icon : "success",
                text : "Your certificate is ready"})
        }).catch((err) => {
            console.log(err);
        })
    }

    const handlelogout = () => {
        dispatch(logOut());
        dispatch(unsetUser());
    }
    return (
        <div className="sidebar">
            <ul>
            <li> <a href="/SolveExam">Solve Exam</a></li>
            <li> <a href="/ViewGrade">View all grade</a></li>
            <li> <a onClick={handlerecieve}>recieve certifcate</a></li>
            <li> <a href="/ViewProgress">view my current progress</a></li>
            <li> <a href="/" onClick={handlelogout}>Log out</a></li>
            </ul>
        </div>
    );
}
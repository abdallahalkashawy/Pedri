import React from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { useSelector } from "react-redux";
const InstructorHome = () => {
    const currentUser = useSelector((state) => state.current.user);
    console.log(currentUser.Type);
    if(currentUser.Type === "Instructor")
    {
    return (
        <div>
        <Header />
        <Sidebar />
        </div>
    );
    }
    else
    {
        return null;
    }
    }

export default InstructorHome;

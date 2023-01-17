import React from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { useSelector } from "react-redux";
const TraineeHome = () => {
    const currentUser = useSelector((state) => state.current.user);
    if(currentUser.Type !== "IndividualTrainee")
    {
        window.location.href = "/";
    }
    return (
        <div>
        <Header />
        <Sidebar />
        </div>
    );
    
}


export default TraineeHome;

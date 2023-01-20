import React, { useEffect } from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
const ViewExams = () => {
    const [exams, setExams] = useState(null);
    const currentUser = useSelector((state) => state.current.user);

    useEffect(() => {
        axios.get()
    },[])
    return (
        <div>
        <Header />

        </div>
    );
    }

export default ViewExams;

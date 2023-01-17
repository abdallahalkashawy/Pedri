import React, { useEffect } from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { useSelector } from "react-redux";
const ViewExams = () => {
    const [exams, setExams] = useState(null);
    const currentUser = useSelector((state) => state.current.user);

    useEffect(() => {

    },[])
    return (
        <div>
        <Header />

        </div>
    );
    }

export default ViewExams;

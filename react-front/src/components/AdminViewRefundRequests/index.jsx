import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

function AdminViewRefundRequests() {
    const [requests, setRequests] = useState([]);
    const [input, setInput] = useState('');
    const [refundedRequests, setRefundedRequests] = useState([]);
    const [refusedRequests, setRefusedRequests] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/ViewRefundRequests')
            .then(res => {
                setRequests(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleRefund = (c) => {
        axios.post('http://localhost:5000/refundTowallet', {
            UserName: c.UserName,
            Course:c.Course,
            amount: input
        })
        .then(res => {
            setRefundedRequests([...refundedRequests, c._id]);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const handleRefuse = (c) => {
        axios.post('http://localhost:5000/RefuserefundTowallet', {
            UserName: c.UserName,
            Course:c.Course,
        })
        .then(res => {
            setRefusedRequests([...refusedRequests, c._id]);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const requestsList = requests.map((c) => {
        if(refundedRequests.includes(c._id)){
            return (
                <div key={c._id}>
                    <span className={styles.courseName}>Username:&nbsp;{c.UserName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.courseName}>Course:&nbsp;{c.Course}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.courseName}>Price:&nbsp;{c.Price}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.courseName}>Reason For Refund:&nbsp;{c.Reason_for_Refund}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>Refunded</span>
                </div>
            );
        }
        else if(refusedRequests.includes(c._id)){
            return (
                <div key={c._id}>
                    <span className={styles.courseName}>Username:&nbsp;{c.UserName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.courseName}>Course:&nbsp;{c.Course}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.courseName}>Price:&nbsp;{c.Price}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.courseName}>Reason For Refund:&nbsp;{c.Reason_for_Refund}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      
            <span>Denied</span>
                </div>
        );
        }
else return (
<div key={c._id}>
                    <span className={styles.courseName}>Username:&nbsp;{c.UserName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.courseName}>Course:&nbsp;{c.Course}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.courseName}>Price:&nbsp;{c.Price}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.courseName}>Reason For Refund:&nbsp;{c.Reason_for_Refund}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
                    <input type="text" onChange={(e) => setInput(e.target.value)} placeholder="Refund Amount" />
                    <button onClick={() => handleRefund(c)}>Refund</button>
                    <button onClick={() => handleRefuse(c)}>Refuse</button>
                </div>
        );
        });
        if(requests.length === 0 ) return <div> <h1>No Refund Requests</h1></div>
        else return (
            <div>
        <h1>Refund Requests</h1>
        {requestsList}
        </div>
        );
        }

export default AdminViewRefundRequests;

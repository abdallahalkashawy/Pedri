import React, { useEffect, useState } from "react";

import "./Question.css";
import useFetch from "../useFetch";

const Question = (props) => {
    const {id,questionIndex ,takeExercise} = props;
    const {incIndex} = props;
    const [q1a, setQ1a] = useState(null);
    const [q1b, setQ1b] = useState(null);
    const [q1c, setQ1c] = useState(null);
    const [q1d, setQ1d] = useState(null);
    const [exerciseAnswer, setExerciseAnswer] = useState("");
    const [bigQuestion, setBigQuestion] = useState("");
    const [Exercise, setExercise] = useState({
        ExerciseID:id,
        Question:bigQuestion,
        Choices:[q1a,q1b,q1c,q1d]
    });

    const setAnswer = (e,answer) => {
        setExerciseAnswer(answer);
    }
    const Increment = () => {
        incIndex(questionIndex);
    }

    const removeThisQuestion =() => {
        const {removeQuestion,id} = props;
        removeQuestion(id);
    }
    const originalQuestion = (e) => {
        setBigQuestion(e.target.value);
    }

    useEffect(() => {
        setExercise({...Exercise,
           ExerciseID:id,
           Question:bigQuestion,
           Choices:[q1a,q1b,q1c,q1d]
       })
    },[bigQuestion,q1a,q1b,q1c,q1d])

    const questionSubmit = () => {
        takeExercise(Exercise,exerciseAnswer);
    }
    return (
        <div className = "questionnew" onLoad={Increment}>
        <h2>Exercise {questionIndex}</h2>
        <input className = "q2" type="text" onChange={originalQuestion}  />
        <ul>
          <li><b>A </b>
            <input className="q1" type="text" name="q1a" onChange={(e) => {setQ1a(e.target.value)}}/>
            <input type="radio" name="q1" value="q1a" onChange={(e)=>{
                setAnswer(e.target.checked , "A");
            }}/>
            </li>
          <li><b>B </b>
            <input className="q1" type="text" name="q1b" onChange={(e)=> {setQ1b(e.target.value)}}/>
            <input type="radio" name="q1" value="q1b" onChange={(e)=>{
                setAnswer(e.target.checked , "B");
            }}/>
            </li>
          <li><b>C </b>
            <input className="q1" type="text" name="q1c" onChange={(e)=>{setQ1c(e.target.value)}}/>
            <input type="radio" name="q1" value="q1c" onChange={(e)=>{
                setAnswer(e.target.checked , "C");
            }}/>
            </li>
          <li><b>D </b>
            <input className="q1" type="text" name="q1d" onChange={(e)=>{setQ1d(e.target.value)}}/>
            <input type="radio" name="q1" value="q1d" onChange={(e)=>{
                setAnswer(e.target.checked , "D");
            }}/>
            </li>
        </ul>
        <button className="remove" type="button" onClick={removeThisQuestion}>remove question</button>
        <button className="remove" key={questionIndex} type="button" onClick={questionSubmit}>submit question</button>
      </div>
    );
    }

export default Question;
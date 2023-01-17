import React, { useEffect, useState } from "react";
import './Choice.css'
const Choice = (props) => {
    const [selectedButton, setSelectedButton] = useState(-1);
    const {choices,exerciseID,selectAnswer} = props;

    const charchoice = (index) => {
        switch(index)
        {
            case 0:
                return "A";
            case 1:
                return "B";
            case 2:
                return "C";
            case 3:
                return "D";
        }
    
    }

    const answerSelected = (index) =>
    {
        setSelectedButton(index);
        selectAnswer({
            ExerciseID : exerciseID,
            ExerciseAnswer : charchoice(index)
        });
    }
    return (
        <div className="choice">
            {choices.map((label, i) => (
            <button key={i} className="listbutton"
            style={{ backgroundColor: i === selectedButton ? "red" : "green" }}
            onClick={() => answerSelected(i)}
            >
            {choices[i]}
            </button>
            ))}
        </div>
    )
}
export default Choice;
import "./App.css";
import React, { useState, useEffect} from "react";
import LoginForm from "./LoginForm";
import TermsAndConditions from "./TermsAndContions";
import Exam from "./InstructorHome/Exam";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import SignUp from "./SignUp";
import Contract from "./Contract";
import InstructorHome from "./InstructorHome/InstructorHome";
import PrivateRoute from "./PrivateRoute";
import TraineeHome from "./TraineeHome/TraineeHome";
import SolveExam from "./TraineeHome/SolveExam";
import ViewGrades from "./TraineeHome/ViewGrades";
import ViewProgress from "./TraineeHome/ViewProgress";

function App() {

  return (
    <div className="App">
    <Router>
      <Switch>
      <PrivateRoute path="/putExam" component={Exam}/>
      <PrivateRoute path="/solveExam" component={SolveExam} />
      <Route exact path="/"  component={LoginForm} />
      <Route path="/SignUp"  component={SignUp} />
      <Route path="/terms-and-conditions"  component={TermsAndConditions} />
      <Route path="/Contract"  component={Contract} />
      <Route path= "/ViewGrade" component={ViewGrades} />
      <Route path="/ViewProgress" component={ViewProgress} />
      <PrivateRoute path="/InstructorHome" component={InstructorHome} />
      <PrivateRoute path="/TraineeHome" component={TraineeHome} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;

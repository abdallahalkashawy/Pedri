import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import AddAdmin from './components/AddAdmin';
import AddInstructor from './components/AddInstructor';
import AddCorpTrainee from './components/AddCorpTrainee';


const centerHorizontal = {
  display: 'flex',
  justifyContent: 'center',
}

const Home = () => {
  return (
    <Router>
      <div className="home">
        <h2>Welcome Admin</h2>
        <div style={centerHorizontal}>
          <Link to='/AddAdmin'><button>Add Admin</button></Link>
          <Link to='/AddCorpTrainee'><button>Add Corporate Trainee</button></Link>
          <Link to='/AddInstructor'><button>Add Instructor</button></Link>
        </div>
        <Route path='/AddAdmin' component={AddAdmin} />
        <Route path='/AddCorpTrainee' component={AddCorpTrainee} />
        <Route path='/AddInstructor' component={AddInstructor} />
      </div>
    </Router>
  );
};

export default Home;

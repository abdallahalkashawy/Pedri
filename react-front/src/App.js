import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from './components/PasswordReset';
import ChangePassword from './components/ChangePass';
// import AddAdmin from './components/AddAdmin';
// import AddInstructor from './components/AddInstructor';
// import AddCorpTrainee from './components/AddCorpTrainee';
import RegisteredCourses from './components/RegisteredCourses';
import ReportCourse from './components/ReportCourse';
import RequestCourse from './components/RequestCourse';
import ViewRequests from './components/ViewRequests';
import SeePrevReported from './components/SeePrevReported';
import AdminViewReported from './components/AdminViewReported';
import AdminViewRefundRequests from './components/AdminViewRefundRequests';
import AdminAllCourses from './components/AdminAllCourses';
import Perspectives from './components/Perspectives';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            
            
            <Route path="/forgot-password" >
              <ForgotPassword />
            </Route>
            <Route path="/password-reset/:userId/:token" >
              <PasswordReset />
              </Route>
            <Route path="/changepass" >
              <ChangePassword />
            </Route> 
            <Route path="/RegisteredCourses" >
              <RegisteredCourses />
            </Route>
            <Route path="/ReportCourse" >
              <ReportCourse />
            </Route>
            <Route path="/RequestCourse" >
              <RequestCourse />
            </Route>
            <Route path="/ViewRequests" >
              <ViewRequests />
            </Route>
            <Route path="/SeePrevReported" >
              <SeePrevReported />
            </Route>
            <Route path="/AdminViewReported" >
              <AdminViewReported />
            </Route>
            <Route path="/AdminViewRefundRequests" >
              <AdminViewRefundRequests />
            </Route>
            <Route path="/AdminAllCourses" >
              <AdminAllCourses />
            </Route>
            <Route path="/Perspectives" >
              <Perspectives />
            </Route>
            

            

            
            
           
          </Switch>
        </div>
      </div>
      <Sidebar />
       
       
    </Router>
  );
}

export default App;
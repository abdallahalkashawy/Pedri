import React,{useContext , useEffect, useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import { setUser } from './redux/userSlice'
import { logIn, saveRefreshToken } from './redux/authSlice';
import swal from 'sweetalert';
import axios from 'axios';
export const MyContext = React.createContext();

const LoginForm = ()=> {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userState = useSelector(state => state.current.user);
  const currentaccess = useSelector(state => state.auth.refreshToken);
  const dispatch = useDispatch();

 const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit =  (event) => {
    event.preventDefault();
   
    if (!username || !password) {
      swal("Username and password must be filled out");
      return;
    }
     axios.post("http://localhost:4000/login",{
      UserName : username,
      Password : password,
    },
   { "Content-Type": "application/json" }
   ).then((res) => {
      dispatch(setUser({
        UserName: res.data.UserName,
        Type: res.data.Type,
      }));
      dispatch(logIn());
      dispatch(saveRefreshToken(res.data.accessToken));
      if(res.data.Type === "Instructor")
      {
        window.location.href = "/InstructorHome";
      }
      else if(res.data.Type === "IndividualTrainee")
      {
        window.location.href = "/TraineeHome";
      }
    }).catch((err) => {
      swal(err.response.data);
  });
  };


  const formStyle = {
      width: '50%',
      maxWidth: '300px',
      margin: '0 auto',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      textAlign: 'center'
    };

    const labelStyle = {
      display: 'block',
      marginBottom: '10px'
    };

    const inputStyle = {
      width: '100%',
      padding: '12px 20px',
      margin: '8px 0',
      boxSizing: 'border-box',
      border: '1px solid #ccc',
      borderRadius: '4px'
    };

    const buttonStyle = {
      width: '100%',
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '14px 20px',
      margin: '8px 0',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    };

    return (
     
      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={labelStyle} htmlFor="username">Username:</label>
        <input
          style={inputStyle}
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <br />
        <label style={labelStyle} htmlFor="password">Password:</label>
        <input
          style={inputStyle}
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <br />
        <button style={buttonStyle} type="submit">Submit</button>
      </form>
    );
  }

export default LoginForm;




 // Send a request to the server to authenticate the user
    // User = {username, password};
    // console.log(MyContext);
    // localStorage.setItem('username',username);
    // const user = localStorage.getItem('username');


      // console.log(userState);
    // console.log(`Username: ${username} Password: ${password}`);
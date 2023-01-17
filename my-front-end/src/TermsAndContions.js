import './TermsAndConditions.css';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { unsetUser } from './redux/userSlice';
import { useHistory } from 'react-router-dom';

const TermsAndConditions = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.current.user);
    const handleAccept = () => {
        console.log(currentUser);
      };
    
      const handleDecline = () => {
        dispatch(unsetUser())
        history.push("/SignUp");
        console.log(currentUser);
      };
  return (
    <div className="terms-and-conditions-container">
    <h1>Terms and conditions</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor 
      malesuada odio, eget malesuada augue aliquam eget.
    </p>
  </div>
  );
}

export default TermsAndConditions;

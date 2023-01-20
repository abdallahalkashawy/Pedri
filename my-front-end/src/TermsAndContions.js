import './TermsAndConditions.css';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { unsetUser } from './redux/userSlice';
import { useHistory } from 'react-router-dom';

const TermsAndConditions = () => {

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

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './Contract.css';
 const Contract = () => {

  const rights = "The rights to the posted videos and materials belong to the company and the registered trainee.";
  const percentage = "The company takes a percentage of each video sold by the registered trainee.";
  return (
    <div >
      <h1 className="contract-title">View and Accept Contract</h1>
      <p className="contract-text">{rights}</p>
      <p className="contract-text">{percentage}</p>
    </div>
  )
}

export default Contract;


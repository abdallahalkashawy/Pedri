import React from "react";
import "./Header.css";
import { useSelector } from "react-redux";
export default function Header() {
  const currentUser = useSelector((state) => state.current.user);
  return (
    <div className="header">
      <h1>Pedri</h1>
      <p>Hello {currentUser.UserName}</p>
    </div>
  );
}

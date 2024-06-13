import React from "react";
import "./403.css";
import { Link } from "react-router-dom";

export default function Err403({ role }) {
  return (
    <div className="text-wrapper">
      <div className="title" data-content={404}>
        403 -ACCESS DENIED
      </div>
      <div className="subtitle">
        Oops, you Don't have permission to access this page
        <p className="text-center">
          <Link to={role === "2001" ? "/" : "/dashborad/writer"}>
            {role === "2001" ? " go to home page" : "go to writer page"}
          </Link>
        </p>
      </div>
    </div>
  );
}

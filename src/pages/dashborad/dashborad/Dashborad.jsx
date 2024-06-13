import React from "react";
import SideBar from "../../../components/dashborad/SideBar";
import TopBar from "../../../components/dashborad/TopBar";
import "./dashborad.css";
import { Outlet } from "react-router-dom";

export default function Dashborad() {
  return (
    <div className="position-relative dashborad">
      <TopBar />
      <div className="d-flex gap-2" style={{ marginTop: "70px" }}>
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}

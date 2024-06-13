import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Menu } from "../../context/MenuContext";
import { WindowSize } from "../../context/WindowContext";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { links } from "./NavLinks";
export default function SideBar() {
  const menu = useContext(Menu);
  const isOpen = menu.IsOpen;
  const [user, setUser] = useState("");
  const windowContext = useContext(WindowSize);
  const windowSize = windowContext.windowSize;
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => Navigate("/login", { replace: true }));
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100vh",
          top: "70px",
          left: "0",
          backgroundColor: "rgba(0,0,0,.2)",
          display: windowSize < "768" && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="sidebar pt-3"
        style={{
          width: isOpen ? "255px" : "fit-content",
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
          position: windowSize < "768" ? "fixed" : "sticky",
        }}
      >
        {links.map(
          (link, key) =>
            link.role.includes(user.role) && (
              <NavLink
                key={key}
                to={link.path}
                className="d-flex align-items-center gap-2 sidebar-link"
              >
                <FontAwesomeIcon icon={link.icon} />
                <p
                  style={{ display: isOpen ? "block" : "none" }}
                  className="m-0"
                >
                  {link.name}
                </p>
              </NavLink>
            )
        )}
      </div>
    </>
  );
}

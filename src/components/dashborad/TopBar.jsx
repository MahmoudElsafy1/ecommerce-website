import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../context/MenuContext";
import { Axios } from "../../Api/Axios";
import { LOGOUT, USER } from "../../Api/Api";
import { Navigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Cookie from "cookie-universal";

export default function TopBar() {
  const menu = useContext(Menu);
  const setOpen = menu.setIsOpen;
  const cookie = Cookie();
  const [name, setName] = useState("");
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => setName(data.data.name))
      .catch(() => Navigate("/login", { replace: true }));
  }, []);
  async function handleLogout() {
    try {
      let res = await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce");

      window.location.pathname = "/login";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="topbar d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-5">
        <h3>E-Commerce</h3>
        <FontAwesomeIcon
          onClick={() => setOpen((prev) => !prev)}
          cursor={"pointer"}
          icon={faBars}
        />
      </div>
      <div>
        <DropdownButton id="dropdown-basic-button" title={name}>
          <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
}

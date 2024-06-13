import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { CAT } from "../../../Api/Api";
import StringSlice from "../../../helpers/StringSlice";

export default function NavBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Axios.get(`${CAT}`).then((res) => setCategories(res.data.slice(-8)));
  }, []);

  const showCategories = categories.map((category, key) => (
    <p className="category-title m-0" key={key}>
      {StringSlice(category.title, 15)}
    </p>
  ));

  return (
    <nav className="py-3 ">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <Link className="col-3" to="/">
            <img
              width="200px"
              height="150px"
              src={require("../../../assets/logo-design.png")}
              alt="logo"
            />
          </Link>
          <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
            <Form.Control
              type="search"
              placeholder="Search Product"
              className="form-contorl custom-search py-3 rounded-0"
            />
            <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center">
              Search
            </h3>
          </div>
          <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
            <Link to="/cart">
              <img
                width="60px"
                src={require("../../../assets/cart.png")}
                alt="cart"
              />
            </Link>
            <Link to="/porfile">
              <img
                width="60px"
                src={require("../../../assets/User-Profile-PNG-Image.png")}
                alt="cart"
              />
            </Link>
          </div>
        </div>
        <div className="mt-3">
          <div className="d-flex align-items-center justify-content-start gap-5 flex-wrap">
            {showCategories}
            <Link
              style={{}}
              to="/categories"
              className="text-black category-title"
            >
              Show All
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

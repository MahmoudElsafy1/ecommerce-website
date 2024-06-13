import React, { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { CAT } from "../../../Api/Api";

import { Container } from "react-bootstrap";
import StringSlice from "../../../helpers/StringSlice";

export default function WebsiteCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Axios.get(`${CAT}`).then((res) => setCategories(res.data));
  }, []);
  const showategories = categories.map((category, key) => (
    <div key={key} className="col-lg-2 col-md-6 col-12 bg-transparent border-0">
      <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
        <img
          src={category.image}
          width="50px"
          alt="just an img"
          className="ms-2"
        />
        <p className="m-0">{StringSlice(category, 12)}</p>
      </div>
    </div>
  ));
  return (
    <>
      <div className=" py-5" style={{ backgroundColor: "#E7F3F8" }}>
        <Container>
          <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-5">
            {showategories}
          </div>
        </Container>
      </div>
    </>
  );
}

import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import StringSlice from "../../../helpers/StringSlice";

export default function ProductCard(props) {
  const roundStar = Math.round(props.rate);
  const stars = Math.min(roundStar, 5);
  const showsolidStart = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solid} />
  ));
  const showRegulerStart = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));
  return (
    <div className="col-md-6 col-lg-3 col-12 ">
      <div
        className="m-1 border rounded p-3 h-100"
        style={{ borderRadius: "15px" }}
      >
        <div className="bg-image rounded hover-overlay">
          <img
            src={props.image}
            className="w-100"
            style={{
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              height: "170px",
            }}
            alt="product imag"
          />
          <a href="#!">
            <div className="mask"></div>
          </a>
        </div>
        <div className="pb-0">
          <div className="d-flex justify-content-between">
            <div>
              <p>
                <a href="#!" className="text-dark">
                  {StringSlice(props.title, 20)}
                </a>
              </p>
              <p className="small text-muted">
                {StringSlice(props.description, 20)}
              </p>
            </div>
            <div>
              <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                {showsolidStart}
                {showRegulerStart}
              </div>
              <p className="small text-muted">Rated 4.0/5</p>
            </div>
          </div>
        </div>
        <hr className="my-0" />
        <div className="pb-0">
          <div className="d-flex justify-content-start gap-3">
            <h5 className="text-primary m-0">{props.discount}$</h5>
            <h6
              className="m-0"
              style={{
                textDecoration: "line-through",
                color: "gray",
              }}
            >
              {props.price}$
            </h6>
          </div>
          <p className="small text-muted">VISA Platinum</p>
        </div>
        <hr className="my-0" />
        <div className="pb-0">
          <div className="d-flex justify-content-between align-items-center pb-2 mt-2 md-4">
            <a href="#!" className="text-dark fw-bold">
              Cancel
            </a>
            <Link className="btn btn-primary" color="primary">
              Buy now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

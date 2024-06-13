import React from "react";

import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./home.css";
import Landing from "../../../components/website/landing/Landing";
import ProductCard from "../../../components/website/product/ProductCard";
import LatestSaleProduct from "../../../components/website/product/LatastSaleProduct";

export default function Home() {
  return (
    <>
      <Landing />
      <LatestSaleProduct />
    </>
  );
}

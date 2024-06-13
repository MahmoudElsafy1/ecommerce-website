import React, { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { LatestSale } from "../../../Api/Api";
import ProductCard from "./ProductCard";
import { Container } from "react-bootstrap";

export default function LatestSaleProduct() {
  const [products, setProduct] = useState();
  useEffect(() => {
    Axios.get(`${LatestSale}`).then((res) => setProduct(res.data));
  }, []);
  console.log(products);
  const showProduct = products?.map((product, i) => (
    <ProductCard
      key={i}
      description={product.description}
      title={product.title}
      image={product.images[0].image}
      discount={product.discount}
      price={product.price}
      rate={product.rating}
    />
  ));

  return (
    <>
      <Container>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap  mt-5 row-gap-3 ">
          {showProduct}
        </div>
      </Container>
    </>
  );
}

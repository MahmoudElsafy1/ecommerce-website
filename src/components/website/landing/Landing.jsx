import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <Container>
        <section className="slider_section">
          <div className="slider_container">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="detail-box">
                          <h1>Welcome To Our Online Shop</h1>
                          <p>
                            Sequi perspiciatis nulla reiciendis, rem, tenetur
                            impedit, eveniet non necessitatibus error distinctio
                            mollitia suscipit. Nostrum fugit doloribus
                            consequatur distinctio esse, possimus maiores
                            aliquid repellat beatae cum, perspiciatis enim,
                            accusantium perferendis.
                          </p>
                          {/* <a href="/*">Contact Us</a> */}
                          <Link
                            to="/shop"
                            className="btn btn-primary mt-3 py-3 px-4 fw-bold text-light"
                          >
                            Shop Now
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-5 ">
                        <div className="img-box">
                          <img
                            src={require("../../../assets/slider-img.png")}
                            alt="loge"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}

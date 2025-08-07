import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import EventImg1 from "../assets/Banner1.jpg";
import EventImg2 from "../assets/Banner2.jpg";
import EventImg3 from "../assets/Banner3.jpg";
import EventImg4 from "../assets/Banner4.jpg";

function HeaderSlider() {
  const images = [EventImg1, EventImg2, EventImg3, EventImg4];

  return (
    <Carousel
      fade
      controls={true}
      indicators={false}
      interval={3000}
      pause="hover"
      className="mb-4"
    >
      {images.map((img, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100 img-fluid"
            src={img}
            alt={`Slide ${index + 1}`}
            style={{
              objectFit: "cover",
              maxHeight: "100vh",
              width: "100%",
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HeaderSlider;

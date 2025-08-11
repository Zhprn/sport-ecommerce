import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
} from "react-bootstrap";

import {
  Facebook,
  Twitter,
  Instagram,
  Github,
} from "lucide-react";

import VisaIcon from "../assets/visa.png";
import MasterCardIcon from "../assets/masterchard.png";
import PayPalIcon from "../assets/paypal.png";
import ApplePayIcon from "../assets/applepay.png";
import GooglePayIcon from "../assets/gpay.png";

function Footer() {
  return (
    <footer className="bg-light text-dark pt-5 pb-3 border-top">
      <Container>
        <Row className="mb-4">
          <Col md={3}>
            <h4 className="fw-bold">SHOP.CO</h4>
            <p className="small">
              We have clothes that suit your style and
              which you're proud to wear. From women to men.
            </p>
            <div className="d-flex gap-2 mt-3">
              <Button variant="outline-secondary" size="sm" href="https://github.com/Zhprn">
                <Twitter size={16} />
              </Button>
              <Button variant="outline-secondary" size="sm" href="http://instagram.com/zhfrnamrr/">
                <Facebook size={16} />
              </Button>
              <Button variant="outline-secondary" size="sm" href="http://instagram.com/zhfrnamrr/">
                <Instagram size={16} />
              </Button>
              <Button variant="outline-secondary" size="sm" href="https://github.com/Zhprn">
                <Github size={16} />
              </Button>
            </div>
          </Col>

          <Col md={2}>
            <h6 className="fw-bold">COMPANY</h6>
            <ul className="list-unstyled small">
              <li>About</li>
              <li>Features</li>
              <li>Works</li>
              <li>Career</li>
            </ul>
          </Col>


          <Col md={2}>
            <h6 className="fw-bold">HELP</h6>
            <ul className="list-unstyled small">
              <li>Customer Support</li>
              <li>Delivery Details</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </Col>
                    
          <Col md={2}>
            <h6 className="fw-bold">FAQ</h6>
            <ul className="list-unstyled small">
              <li>Account</li>
              <li>Manage Deliveries</li>
              <li>Orders</li>
              <li>Payments</li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold">RESOURCES</h6>
            <ul className="list-unstyled small">
              <li>Free eBooks</li>
              <li>Development Tutorial</li>
              <li>How to - Blog</li>
              <li>Youtube Playlist</li>
            </ul>
          </Col>
        </Row>

        <hr />

        <Row className="justify-content-between align-items-center">
          <Col md={6}>
            <p className="small mb-0">
              Shop.co © 2000-2023, All Rights Reserved
            </p>
          </Col>
          <Col md="auto" className="d-flex gap-2">
            <Image src={VisaIcon} height={50} />
            <Image src={MasterCardIcon} height={50} />
            <Image src={PayPalIcon} height={50} />
            <Image src={ApplePayIcon} height={50} />
            <Image src={GooglePayIcon} height={50} />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

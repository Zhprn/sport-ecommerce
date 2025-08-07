import React from 'react';
import { Navbar, Nav, Container, Dropdown, Form, InputGroup, FormControl } from 'react-bootstrap';
import { Search, ShoppingCart, User } from 'lucide-react';

const ShopNavbar = () => {
  return (
    <Navbar bg="white" expand="lg" className="py-3 shadow-sm border-bottom">
      <Container>
        <Navbar.Brand href="/" className="fw-bold fs-4">SHOP.CO</Navbar.Brand>

        <Nav className="me-auto ms-4 align-items-center gap-3">
          <Dropdown>
            <Dropdown.Toggle variant="link" className="text-dark text-decoration-none p-0">
              Shop
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/clothes">Clothes</Dropdown.Item>
              <Dropdown.Item href="/shoes">Shoes</Dropdown.Item>
              <Dropdown.Item href="/accessories">Accessories</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Nav.Link href="#newArrifal" className="text-dark">New Arrivals</Nav.Link>
          <Nav.Link href="/brand" className="text-dark">Brands</Nav.Link>
        </Nav>

        <Form className="d-flex w-50 me-3">
          <InputGroup>
            <InputGroup.Text className="bg-light border-0">
              <Search size={18} />
            </InputGroup.Text>
            <FormControl
              type="search"
              placeholder="Search for products..."
              className="bg-light border-0"
              aria-label="Search"
            />
          </InputGroup>
        </Form>

        <Nav className="align-items-center gap-3">
          <Nav.Link href="/cart" className="text-dark"><ShoppingCart size={22} /></Nav.Link>
          <Nav.Link href="/login" className="text-dark"><User size={22} /></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default ShopNavbar;

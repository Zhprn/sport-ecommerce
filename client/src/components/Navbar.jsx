import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Dropdown, Form, InputGroup, FormControl } from 'react-bootstrap';
import { Search, ShoppingCart, User } from 'lucide-react';
import Swal from 'sweetalert2';

const ShopNavbar = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (storedUsername && token) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:8000/api/logout", { 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("id_user");
        Swal.fire({
          icon: "success",
          title: "Logout berhasil",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/login";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal logout",
          text: data.message || "Terjadi kesalahan",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Kesalahan server",
        text: err.message,
      });
    }
  };

  return (
    <Navbar bg="white" expand="lg" className="py-3 shadow-sm border-bottom">
      <Container>
        <Navbar.Brand href="/" className="fw-bold fs-4">SHOP.CO</Navbar.Brand>

        <Nav className="me-auto ms-4 align-items-center gap-3">

          <Nav.Link href="#newArrival" className="text-dark">New Arrivals</Nav.Link>
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
          {username ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="text-dark text-decoration-none p-0">
                {username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/orders">Orders</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav.Link href="/login" className="text-dark"><User size={22} /></Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default ShopNavbar;

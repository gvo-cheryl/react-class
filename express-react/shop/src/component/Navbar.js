import React from "react";
import { Navbar, Container, Nav, NavItem, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">MY SHOP</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* 
              <Nav.Link>와 <Link>는 자체로 a태그의 역할을 하기 때문에 중복해서 사용할수 없음으로
              사용할 경우는 아래와 같이 사용한다. 
              1) <Nav><NavItem to="/"></NavItem></Nav>
              2) <Nav.Link as={Link} to="/"></Nav.Link> 
          */}
          <Nav className="mr-auto">
            <NavItem className="header-nav">
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem className="header-nav">
              <Link to="/cart">Cart</Link>
            </NavItem>
            <NavItem className="header-nav">
              <Link to="/practice">Practice</Link>
            </NavItem>
            {/* <Nav.Link as={Link} to="/detail/:id">
              Detail
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Button>Button</Button>
    </Navbar>
  );
}

export default Header;

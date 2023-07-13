"use client";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Link from "next/link";

import './styles.css';

const NavigationBar = () => {
    return (
      <>
        {[false].map((expand) => (
          <Navbar key={expand} expand={expand} className="navbar-dark bg-dark mb-3 fixed-top">
            <Container fluid>
              <Navbar.Brand href="#">Alessandrovaru</Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link className='nav-link' href="/mandalas">Mandalas</Link>
                    <Link className='nav-link' href="/mixtapes-de-caracas">Mixtapes de Caracas</Link>
                    <Link className='nav-link' href="/contact">Contact</Link>
                  </Nav>
                  
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    )
  };
   
  export default NavigationBar;
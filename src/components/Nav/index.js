"use client";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import logoName from "/public/images/logoName.png";

import Link from "next/link";

import './styles.css';
import Image from 'next/image';

const NavigationBar = () => {
  // Make the navbar close once a link is clicked
  const closeNavbar = () => {
    document.querySelector('.navbar-toggler').click();
  }
    return (
      <>
        {[false].map((expand) => (
          <Navbar key={expand} expand={expand} className="navbar-dark">
            <Container>
              <Link href="/" className="navbar-brand"><Image src={logoName} className='img-fluid' ></Image></Link>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    MENÚ
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link onClick={closeNavbar} className='nav-link' href="/mandalas">MANDALAS</Link>
                    <Link onClick={closeNavbar} className='nav-link' href="/mixtapes-de-caracas">MIXTAPES DE CARACAS</Link>
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
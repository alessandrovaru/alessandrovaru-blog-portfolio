"use client";

import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Link from "next/link";
import Image from 'next/image';

import logoName from "/public/images/logoName.png";

import './styles.css';

const LINKS = [
  { href: '/dlhtynqn', label: 'DLHTYNQN' },
  { href: '/mandalas', label: 'MANDALAS' },
  { href: '/mixtapes-de-caracas', label: 'MIXTAPES DE CARACAS' },
  { href: '/fantasias', label: 'FANTASÍAS' },
];

const NavigationBar = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Navbar expand={false} className="navbar-dark">
      <Container>
        <Link href="/" className="navbar-brand">
          <Image src={logoName} className="img-fluid" alt="Alessandrovaru — inicio" priority />
        </Link>
        <Navbar.Toggle aria-controls="offcanvasNavbar" label="Abrir menú" onClick={() => setOpen(true)} />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={open}
          onHide={close}
        >
          <Offcanvas.Header closeButton closeLabel="Cerrar menú">
            <Offcanvas.Title id="offcanvasNavbarLabel">MENÚ</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {LINKS.map((link) => (
                <Link key={link.href} onClick={close} className="nav-link" href={link.href}>
                  {link.label}
                </Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

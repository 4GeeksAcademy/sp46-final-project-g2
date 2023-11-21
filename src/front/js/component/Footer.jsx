
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Logo from "../../img/logo.png";

export const Footer = () => {
  return (
    <div className="container bg-dark text-light">
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-3 my-2 border-top">
        <div className="col mb-3">
          <a href="#" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
            <img src={Logo} alt="LiteraryInk logo" style={{ width: '8rem' }} />
          </a>
          <p className="text-body-secondary"></p>
        </div>
        <div className="col mb-3">
        </div>
         <div className="col mb-3">
          <Link to="/contact-us" className="nav-link p-0 text-light">
          <h4 style={{ textDecoration: "underline" }}>Contacto</h4>
          </Link>
        </div>
        <div className="col mb-3">
          <h4 style={{ textDecoration: "underline" }}>Nuestro Equipo</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="https://github.com/hchocobar" target="_blank" className="nav-link p-0 text-light">Héctor Chocobar</a></li>
            <li className="nav-item mb-2"><a href="https://github.com/ElisaGDR" target="_blank" className="nav-link p-0 text-light">Elisa García</a></li>
            <li className="nav-item mb-2"><a href="https://github.com/carlosp-11" target="_blank" className="nav-link p-0 text-light">Carlos Ponce</a></li>
            <li className="nav-item mb-2"><a href="https://github.com/GsX26" target="_blank" className="nav-link p-0 text-light">Gonzalo Suárez</a></li>
          </ul>
        </div>
        <div className="col mb-3">
          <h4 style={{ textDecoration: "underline" }}>Legal</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><Link to="/disclaimer-view" className="nav-link p-0 text-light">Términos y condiciones</Link></li>
            <li className="nav-item mb-2"><Link to="/privacy-policy-view" className="nav-link p-0 text-light">Política de privacidad</Link></li>
          </ul>
        </div>
      </footer>
      <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-2 border-top">
        <p>© 2023 LiteraryInk, Inc. All rights reserved.</p>
        <ul className="list-unstyled d-flex">
          <li className="ms-3"><a className="link-body-emphasis" href="#"><FontAwesomeIcon icon={faTwitter} style={{ color: 'white', fontSize: '24px' }} /></a></li>
          <li className="ms-3"><a className="link-body-emphasis" href="#"><FontAwesomeIcon icon={faInstagram} style={{ color: 'white', fontSize: '24px' }} /></a></li>
          <li className="ms-3"><a className="link-body-emphasis" href="#"><FontAwesomeIcon icon={faFacebook} style={{ color: 'white', fontSize: '24px' }} /></a></li>
        </ul>
      </div>
    </div>
  );
};
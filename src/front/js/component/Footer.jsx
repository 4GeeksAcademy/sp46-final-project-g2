import React from "react";
import { Link } from "react-router-dom";
// import { Logo } from "src/front/img/Logo.jpg"

export const Footer = () => {
  return (
    <div className="container bg-dark text-light">
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
        <div className="col mb-3">
          <a href="/" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
          </a>
          <p className="text-body-secondary">© 2023</p>
        </div>
        <div className="col mb-3">
        </div>
        <div className="col mb-3">
          <h4>About us</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="https://www.linkedin.com/in/carlos-p11/" target="_blank" className="nav-link p-0 text-light">Carlos Ponce</a></li>
            <li className="nav-item mb-2"><a href="https://github.com/GsX26" target="_blank" className="nav-link p-0 text-light">Gonzalo</a></li>
            <li className="nav-item mb-2"><a href="https://www.linkedin.com/in/elisa-garc%C3%ADa-d%C3%ADaz-ropero/" target="_blank" className="nav-link p-0 text-light">Elisa García</a></li>
          </ul>
        </div>
        <div className="col mb-3">
          <h4>Contact us</h4>
        </div>
        <div className="col mb-3">
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><Link to="/disclaimer-view" className="nav-link p-0 text-light">Términos y condiciones</Link></li>
            <li className="nav-item mb-2"><Link to="/privacy-policy-view" className="nav-link p-0 text-light">Política de privacidad</Link></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";

export const Jumbotron = () => {
  return (
    <div
      className="jumbotron jumbotron-fluid d-flex align-items-center justify-content-center text-center"
      style={{
        backgroundImage: 'url("https://img.freepik.com/vector-gratis/fondo-textura-acuarela-negra-pintada-mano_1017-14837.jpg?size=626&ext=jpg&ga=GA1.1.1749064473.1700160771&semt=ais")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        height: '600px',
      }}
    >
      <div className="container">
        <p className="fs-4">
          Bienvenido a LiteraryInk.
        </p>
        <p className="fs-4">
          Conecta, inspira y comparte tu pasión por las letras en nuestra comunidad exclusiva para escritores.
        </p>
        <Link className="dropdown-item" to="/posts">
          <button className="btn btn-warning fw-bold text-dark mt-4 mb-4" type="button">
            Sumérgete en la escritura
          </button>
        </Link>
      </div>
    </div>
  );
};




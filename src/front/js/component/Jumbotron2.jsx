import React from "react";
import { Link } from "react-router-dom";

export const Jumbotron2 = () => {
  return (
    <div
      className="jumbotron jumbotron-fluid d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: 'url("https://img.freepik.com/foto-gratis/representacion-3d-fondo-abstracto-blanco-negro_23-2150914025.jpg?size=626&ext=jpg&ga=GA1.1.1749064473.1700160771&semt=ais")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        height: '500px',
      }}
    >
      <div className="container" style={{maxWidth: "50%", alignItems: "left" }}> 
        <h1 className="display-5 fw-bold">Publica</h1>
        <div className="row">
          <div className="col-8">
        <p className="custom-text mt-3">
          Embárcate en un viaje a través de las páginas virtuales, explorando la diversidad de estilos y géneros.
          Únete a nosotros en este viaje literario, donde la pluma es nuestra brújula y las historias son el mapa que nos guía.
          ¡Bienvenidos a nuestro mundo de palabras, donde cada línea es una invitación a explorar la creatividad sin límites!
        </p>
        </div></div>
        <Link className="dropdown-item" to="/login">
          <button className="btn btn-warning fw-bold text-dark mt-4 mb-4" type="button">
            Iniciar Travesía Literaria
          </button>
        </Link>
      </div>
    </div>
  );
};



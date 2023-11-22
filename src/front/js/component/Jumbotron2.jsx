import React from "react";
import { Link } from "react-router-dom";


export const Jumbotron2 = () => {
  const jumbotronStyle = {
    backgroundImage: 'url("https://img.freepik.com/foto-gratis/representacion-3d-fondo-abstracto-blanco-negro_23-2150914025.jpg?size=626&ext=jpg&ga=GA1.1.1749064473.1700160771&semt=ais")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white', // Color del texto para que sea legible sobre la imagen de fondo
    //textAlign: 'center',
    padding: '80px 0', // Ajusta el relleno según sea necesario
  };
  return (
    <div style={jumbotronStyle}>
      <div className="container">
        <h1 className="display-5 fw-bold">Post</h1>
        <p className="col-md-8 fs-4">
          Embárcate en un viaje a través de las páginas virtuales, explorando la diversidad de estilos y géneros.
          Únete a nosotros en este viaje literario, donde la pluma es nuestra brújula y las historias son el mapa que nos guía.
          ¡Bienvenidos a nuestro mundo de palabras, donde cada línea es una invitación a explorar la creatividad sin límites!.
        </p>
        <button className="btn btn-primary btn-lg" type="button">
          Iniciar Travesía Literaria
        </button>
      </div>
    </div>
  );
};
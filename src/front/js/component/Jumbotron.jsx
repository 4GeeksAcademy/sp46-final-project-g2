import React from "react";

export const Jumbotron = () => {
  const jumbotronStyle = {
    backgroundImage: 'url("https://img.freepik.com/vector-gratis/fondo-textura-acuarela-negra-pintada-mano_1017-14837.jpg?size=626&ext=jpg&ga=GA1.1.1749064473.1700160771&semt=ais")',
    backgroundSize: 'cover',
    fontSize: '50px',
    backgroundPosition: 'center',
    color: 'white', // Color del texto para que sea legible sobre la imagen de fondo
    //textAlign: 'center',
    padding: '80px 0', // Ajusta el relleno según sea necesario
  };
  return (
    <div style={jumbotronStyle}>
      <div className="container">
        <h1 className="display-5 fw-bold">Literayink</h1>
        <p className="col-md-8 fs-4">
        Conecta, inspira y comparte tu pasión por las letras en nuestra comunidad exclusiva para escritores. Descubre un espacio donde la creatividad fluye, las historias se entrelazan y las palabras cobran vida.
        </p>
        <button className="btn btn-primary btn-lg" type="button">
          Sumérgete en la escritura
        </button>
        </div>
    </div>
  );
};
import React from "react";

export const Jumbotron = () => {
  const jumbotronStyle = {
    backgroundImage: 'url("https://i0.wp.com/www.nuevarevista.net/wp-content/uploads/2018/03/Literatura-universal.jpg?fit=1021%2C598&ssl=1")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white', // Color del texto para que sea legible sobre la imagen de fondo
    textAlign: 'center',
    padding: '100px 0', // Ajusta el relleno según sea necesario
  };

  return (
    <div style={jumbotronStyle}>
      <div className="container">
        <h1 className="display-5 fw-bold">Literayink</h1>
        <p className="col-md-8 fs-4">
          Es una plataforma inventada que es algo así como una red social para escritores primerizos, con su apartado gratuito donde además de leer y escribir a modo de blog puedes crear comunidad y ver eventos y concursos. Y luego registrándote y pagando una membresía puedes obtener servicios como reviews de críticos literarios de renombre, mentorías y talleres de varias temáticas como por ejemplo "publica tu primer libro" y te ayudan en el proceso desde creativo hasta editorial, y luego cuantas con los servicios de Apis externas de AI (una de ellas transcribe a partir de una imagen, tu texto escrito a mano a caracteres digitales). Entonces es como una mezcla de red social/blog + e-commerce para adentrarse en el mundo profesional. Con su parte gratuita y su parte de membresía
        </p>
        <button className="btn btn-primary btn-lg" type="button">
          Post
        </button>
      </div>
    </div>
  );
};

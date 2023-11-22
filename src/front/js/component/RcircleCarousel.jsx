import React from "react";


export const RcircleCarousel = () => {
  return (
    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="card mx-auto text-center" style={{ width: "80rem" }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX_SqY9LhBj0G_sNfRz0Hlh07wDEr_sFQvzg&usqp=CAU"
              className="card-img-top rounded-circle mx-auto mt-3"
              alt="Card circle"
              style={{ width: "250px", height: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title"
                style={{
                  color: "white", // Cambia el color del texto a azul
                }}>PEN TO PRINT</h5>
              <p className="card-text"
                style={{
                  color: "white", // Cambia el color del texto a azul
                }}>
                Convierte fácilmente escritura a mano desordenada y notas cursivas en texto en línea.
              </p>
              <a href="#" className="btn btn-primary">Vamos allá</a>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card mx-auto text-center" style={{ width: "80rem" }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4lJGhhobc5XgdWq9IC2_P9l5qzwXumXOrwA&usqp=CAU"
              className="card-img-top rounded-circle mx-auto mt-3"
              alt="Card circle"
              style={{ width: "250px", height: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title"
                style={{
                  color: "white", // Cambia el color del texto a azul
                }}>TALLERES</h5>
              <p className="card-text"
                style={{
                  color: "white", // Cambia el color del texto a azul
                }}>
                Los talleres de escritura responden a la necesidad de crear nuestras propias historias y compartirlas con quienes nos escuchan o leen.
              </p>
              <a href="#" className="btn btn-primary">Comenzamos</a>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card mx-auto text-center" style={{ width: "80rem" }}>
            <img
              src="data:image/jpeg;base64,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"
              className="card-img-top rounded-circle mx-auto mt-3"
              alt="Card circle"
              style={{ width: "250px", height: "250px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title"
                style={{
                  color: "white", // Cambia el color del texto a azul
                }}>REVIEWS</h5>
              <p className="card-text"
                style={{
                  color: "white", // Cambia el color del texto a azul
                }}>
                Suele decirse que para gustos, los colores… aunque tampoco estaría de más decir que para gustos, los libros y los autores.
              </p>
              <a href="#" className="btn btn-primary">Veamos</a>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
import React from "react";
export const RcircleCarousel = () => {
  return (
    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="card mx-auto text-center" style={{ width: "100%", backgroundColor: "rgba(0,0,0,.2)"}}>
            <img
              src="https://play-lh.googleusercontent.com/7ikRKiSS29q0ug3ZFvViL4Qmv8uOH1K_W7C-Go_gj4Z9L6y5hDW19nyRgnpwoBe32sE"
              className="card-img-top rounded-circle mx-auto mt-3"
              alt="Card circle"
              style={{ width: "220px", height: "220px", objectFit: "cover" }}
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
              </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card mx-auto text-center" style={{ width: "100%", backgroundColor: "rgba(0,0,0,.2)" }}>
            <img
              src="https://img.freepik.com/foto-gratis/persona-haciendo-scrapbooking-casa_23-2149614050.jpg?w=360&t=st=1700694532~exp=1700695132~hmac=7f4fb98143759975389f3e161e4f036ba2e8496a4f1b498e6d22dba0d2618277"
              className="card-img-top rounded-circle mx-auto mt-3"
              alt="Card circle"
              style={{ width: "220px", height: "220px", objectFit: "cover" }}
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
              </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="card mx-auto text-center" style={{ width: "100%", backgroundColor: "rgba(0,0,0,.2)" }}>
            <img
              src="https://img.freepik.com/foto-gratis/gente-negocios-leyendo-buenas-criticas_1098-21692.jpg?w=996&t=st=1700694645~exp=1700695245~hmac=5c6c5a5304596ca2e080bbb32d442c9420033f218bbce40fa249c38c2b4892b1"
              className="card-img-top rounded-circle mx-auto mt-3"
              alt="Card circle"
              style={{ width: "220px", height: "220px", objectFit: "cover" }}
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
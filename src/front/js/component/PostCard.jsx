import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashnode } from "@fortawesome/free-brands-svg-icons";
import { faGlasses } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import pic from "../../img/sisifo.jpg"

export const PostCard = () => {
  return (
    <div className="card mb-2 mx-1" style={{ height: '218pxpx' }}>
      <div className="row g-0">

        <div className="col-5 col-md-4 col-lg-3 col-xl-3 col-xxl-2 ">
          <div className="">
            <Link to="/post-view">
              <img height src={pic} className="img-fluid rounded-start" 
              alt="..." style={{ height: '217px', width: '155px' }} />
            </Link>
          </div>
        </div>

        <div className="col-7 col-md-8 col-lg-9 col-xl-9 col-xxl-10">
          <div className="card-body">
            <h5 className="card-title">
              <Link to="/post-view"> El mito de Sísifo </Link>
            </h5>
            <h6 className="card-subtitle mb-4 text-body-secondary fw-lighter">
              <FontAwesomeIcon className="me-2" icon={faHashnode} size="sm" />
              <Link to="#">Ensayo</Link> <span className="fw-bold"> · </span>
              <Link to="#">Prosa</Link> <span className="fw-bold"> · </span>
              <Link to="#">Existencialismo</Link>
            </h6>
            <p className="card-text text-truncate">El título del ensayo proviene de un atribulado personaje de la mitología griega.
              En él, Camus discute la cuestión del suicidio y el valor de la vida, presentando el mito de Sísifo como
              metáfora del esfuerzo inútil e incesante del hombre. De esta forma plantea la filosofía del absurdo, que
              mantiene que nuestras vidas son insignificantes y no tienen más valor que el de lo que creamos. Siendo el
              mundo tan fútil, Camus pregunta, ¿hay alternativa al suicidio? El ensayo se inicia: No hay sino un problema
              filosófico realmente serio: el suicidio.</p>
            <h6 className="card-subtitle fw-lighter mb-2"> <FontAwesomeIcon icon={faGlasses} size="sm" /> <span className="text-light"> 751 </span> veces leído </h6>
            <h6 className="card-subtitle fw-lighter mb-2"> <FontAwesomeIcon icon={faStar} size="sm" /><FontAwesomeIcon icon={faStar} size="sm" /><FontAwesomeIcon icon={faStar} size="sm" />
              <FontAwesomeIcon icon={faStar} size="sm" /><FontAwesomeIcon icon={faStarHalfStroke} size="sm" /> - 4,5
            </h6>
          </div>
        </div>

      </div>
    </div>
  );
};
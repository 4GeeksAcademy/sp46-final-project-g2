import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashnode } from "@fortawesome/free-brands-svg-icons";
import { faGlasses } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";

export const PostCard = () => {
    return (

        <div className="card my-1 mx-2" >
        <div className="card-body">
          <h5 className="card-title"><Link to="/post-view">El mito de Sísifo</Link></h5>
          <h6 className="card-subtitle mb-4 text-body-secondary fw-lighter"> <FontAwesomeIcon icon={faHashnode} size= "sm"/>  
          <Link to="#">Ensayo </Link> -  <Link to="#"> Prosa </Link> -  <Link to="#"> Existencialismo </Link> </h6>
          <p className="card-text text-truncate">El título del ensayo proviene de un atribulado personaje de la mitología griega. 
          En él, Camus discute la cuestión del suicidio y el valor de la vida, presentando el mito de Sísifo como 
          metáfora del esfuerzo inútil e incesante del hombre. De esta forma plantea la filosofía del absurdo, que 
          mantiene que nuestras vidas son insignificantes y no tienen más valor que el de lo que creamos. Siendo el 
          mundo tan fútil, Camus pregunta, ¿hay alternativa al suicidio? El ensayo se inicia: No hay sino un problema 
          filosófico realmente serio: el suicidio.</p>
          <h6 className="card-subtitle fw-lighter mb-2"> <FontAwesomeIcon icon={faGlasses}  size= "sm" /> <span className="text-light"> 751 </span> veces leído </h6>
          <h6 className="card-subtitle fw-lighter mb-2"> <FontAwesomeIcon icon={faStar}  size= "sm" /><FontAwesomeIcon icon={faStar}  size= "sm" /><FontAwesomeIcon icon={faStar}  size= "sm" />
          <FontAwesomeIcon icon={faStar}  size= "sm" /><FontAwesomeIcon icon={faStarHalfStroke}  size= "sm" /> - 4,5
          </h6>
        </div>
      </div>
    );
};
import React from "react";
import { Link } from "react-router-dom";
import pic from "../../img/camus.jpeg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { BotonSeguir } from "./BotonSeguir.jsx";
import { BotonEditar } from "./BotonEditar.jsx";


export const ProfileCard = (props) => {
    const login = true;

    return (

        <div className="card my-1 mx-1"  >
            <img src= {pic} className="card-img-top " alt="..." style={{ maxHeight: 'auto' }}/>
                <div className="card-body">
                    <h5 className="card-title my-1">Albert Camus</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{props.alias}</h6>
                    {login? <BotonEditar/>: <BotonSeguir/> }
                    <p className="card-text">{props.quote}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">                        
                        <p className="card-text text-body-secondary"><FontAwesomeIcon icon={faPenNib} /> {props.birthday} </p>
                    </li>
                    <li className="list-group-item">
                        <p className="card-text text-body-secondary"><FontAwesomeIcon icon={faLocationDot} /> {props.city}, {props.country} </p>
                    </li>
                    <li className="list-group-item">
                        <p className="card-text text-body-secondary"><FontAwesomeIcon icon={faBookOpenReader} /> <span className="text-light"> 153 </span> seguidores </p>
                    </li>
                    <li className="list-group-item">
                        <p className="card-text text-body-secondary"><FontAwesomeIcon icon={faAlignJustify} /> <span className="text-light"> 75 </span> posts </p>
                    </li>
                </ul>              
        </div>
    );
};
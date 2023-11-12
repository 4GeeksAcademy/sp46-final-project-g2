import React from "react";
import { Link } from "react-router-dom";
import pic from "../../img/camus.jpeg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";


export const ProfileCard = () => {
    return (

        <div className="card my-1 mx-2"  >
            <img src= {pic} className="card-img-top " alt="..." style={{ maxHeight: 'auto' }}/>
                <div className="card-body">
                    <h5 className="card-title my-1">Albert Camus</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Sysiphus</h6>
                    <button className="btn btn-primary w-100 py-1 my-3"> Seguir </button>
                    <p className="card-text">Every act of rebellion expresses a nostalgia for innocence and an appeal to the essence of being</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">                        
                        <p className="card-text text-body-secondary"><FontAwesomeIcon icon={faPenNib} /> 7 nov 1913 </p>
                    </li>
                    <li className="list-group-item">
                        <p className="card-text text-body-secondary"><FontAwesomeIcon icon={faLocationDot} /> Mondovi, Argelia Francesa </p>
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
import React from "react";
import { BotonEditar } from "./BotonEditar.jsx";



export const BioCard = (props) => {
    const login = true;

    return (

        <div className="card mt-1 mb-3 mx-1" >
            <div className="card-body">
                <h5 className="card-title border-bottom">Acerca de mí</h5>
                <p className="card-text py-4 px-4">{props.about}</p>
            </div>
            <div className="px-4" > {login? <BotonEditar/>: <span/>} </div>
            
        </div>
    );
};
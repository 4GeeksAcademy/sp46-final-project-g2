import React from "react";
import { Link } from "react-router-dom";


export const BotonIngresar = () => {
    return (
        <Link to="/login">
            <button className="btn btn-warning fw-bold text-dark w-100 "> Ingresa </button>
        </Link>
    );
};
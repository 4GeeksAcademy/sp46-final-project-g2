import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { BotonLogged } from "./BotonLogged.jsx";
import { Context } from "../store/appContext";


export const BotonIngresar = () => {
    const {store, actions} = useContext(Context);

    useEffect(() => {
        store.isLogged;
    }, []);

    if (!store.isLogged){
    return (
        <Link to="/login">
            <button className="btn btn-warning fw-bold text-dark w-100"> Ingresar </button>
        </Link>
    );
    }else {
        return <BotonLogged/>
    } 
};
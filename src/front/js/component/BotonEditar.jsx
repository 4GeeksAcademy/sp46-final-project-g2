import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { BotonSeguir } from "./BotonSeguir.jsx";


export const BotonEditar = () => {
    const { store, actions } = useContext(Context);
    
    
    useEffect(() => {
        store.authorIdNumber;
        store.isLogged
      }, []);


    if ((store.isLogged && store.authorIdNumber==0) ||  (store.isLogged && store.authorIdNumber == store.author.id) ) {
    return (
        <button className="btn btn-warning w-100 py-1 my-3"> Editar </button>        
    );
    } else {
        return <BotonSeguir />;
    }
};
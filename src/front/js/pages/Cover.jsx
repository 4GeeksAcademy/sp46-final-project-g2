import React, {useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import pic from "../../img/logo.png"
import { Context } from "../store/appContext";


export const Cover = () => {
    const { store, actions } = useContext(Context)
    useEffect ( () => {
    }, [] )
    return (
        <div className="d-flex h-100 text-center text-bg-dark py-5 my-5" style={{minHeight: '790px'}}>
            <div className="cover-container d-flex w-100 h-100 p-3 py-5 my-5 mx-auto flex-column">
                <div className="px-3 py-5 my-5">
                    <h1><img src={pic} /></h1>
                    <p className="lead">
                        Conecta, inspira y comparte tu pasión por las letras en nuestra comunidad exclusiva para escritores.
                        Descubre un espacio donde la creatividad fluye, las historias se entrelazan y las palabras cobran vida.
                    </p>
                    <p className="lead">
                        <Link to="/posts">
                            <button className="btn btn-warning fw-bold text-dark"> Empezar </button>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
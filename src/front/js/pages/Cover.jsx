import React from "react";
import { Link } from "react-router-dom";
import pic from "../../img/logo.png"


export const Cover = () => {
    return (
        <div class="d-flex h-100 text-center text-bg-dark py-5 my-5">
            <div class="cover-container d-flex w-100 h-100 p-3 py-5 my-5 mx-auto flex-column">
                <div class="px-3 py-5 my-5">
                    <h1><img src={pic} /></h1>
                    <p class="lead">
                        Conecta, inspira y comparte tu pasión por las letras en nuestra comunidad exclusiva para escritores.
                        Descubre un espacio donde la creatividad fluye, las historias se entrelazan y las palabras cobran vida.
                    </p>
                    <p class="lead">
                        <Link to="/posts">
                            <button className="btn btn-warning fw-bold text-dark"> Empezar </button>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
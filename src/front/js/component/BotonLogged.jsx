import React from "react";
import { Link } from "react-router-dom";
import pic from "../../img/camus.jpeg"


export const BotonLogged = () => {
    return (
        <div className="dropdown col-12 col-md-4 pt-2 pe-5 me-5">
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle me-5"
                data-bs-toggle="dropdown" aria-expanded="false">
                <img src={pic} alt="" width="32" height="32" class="rounded-circle me-2" />
            </a>

            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">

                <li className="list-group-item-action">
                    <Link to="/post-edit">
                        <button className="btn border border-0 py-1"> Escribir un post </button>
                    </Link>
                </li>

                <li className="list-group-item-action">
                    <Link to="/member">
                        <button className="btn border border-0 py-1"> Suscripción </button>
                    </Link>
                </li>

                <li className="list-group-item-action">
                    <Link to="/shopping-cart">
                        <button className="btn border border-0 py-1"> Cesta </button>
                    </Link>
                </li>

                <li className="list-group-item-action">
                    <Link to="/author-profile">
                        <button className="btn border border-0 py-1"> Perfil </button>
                    </Link>
                </li>

                <li><hr className="dropdown-divider" /></li>

                <li className="list-group-item-action">
                    <Link to="/logout">
                        <button className="btn border border-0 py-1"> Cerrar sesión </button>
                    </Link>
                </li>
            </ul>
        </div>
    );
};
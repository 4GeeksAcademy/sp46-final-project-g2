import React, {useContext} from "react";
import { Link } from "react-router-dom";
import pic from "../../img/camus.jpeg"
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";



export const BotonLogged = () => {
    
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const handleLogout = () => {
        actions.logout();
        navigate("/login");
    }
   
    return (
        <div className="dropdown col-12 col-md-4 pt-2 pe-5 me-5">
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle me-5"
                data-bs-toggle="dropdown" aria-expanded="false">
                <img src={pic} alt="" width="32" height="32" className="rounded-circle me-2" />
            </a>

            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">

                <li className="list-group-item-action">
                    <Link to="/post-edit">
                        <button className="btn border border-0 py-1"> Escribir un post </button>
                    </Link>
                </li>

                <li className="list-group-item-action">
                    <Link to="/member">
                        <button className="btn border border-0 py-1"> Mi cuenta </button>
                    </Link>
                </li>

                <li className="list-group-item-action">
                    <Link to="/pen-api">
                        <button className="btn border border-0 py-1"> Pen To Print </button>
                    </Link>
                </li>

                <li className="list-group-item-action">
                    <Link to="/author-profile">
                        <button className="btn border border-0 py-1"> Perfil </button>
                    </Link>
                </li>

                <li><hr className="dropdown-divider" /></li>

                <li className="list-group-item-action">                   
                        <button className="btn border border-0 py-1" onClick={handleLogout}> Cerrar sesión </button>                    
                </li>
            </ul>
        </div>
    );
};
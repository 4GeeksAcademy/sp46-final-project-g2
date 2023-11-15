import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { BotonIngresar } from "./BotonIngresar.jsx";
import { BotonLogged } from "./BotonLogged.jsx";


export const Navbar = () => {
	const login = true;

	return (
		<nav class="navbar navbar-expand-md navbar-dark py-2">
			<div className="container-fluid">

				<div className="me-3 ms-5 ps-5">
					<Link to="/">
						<img src={Logo} alt="LiteraryInk logo" style={{ width: '8rem' }} />
					</Link>
				</div>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
					data-bs-target="#navbarLiteraryInk" aria-controls="navbarLiteraryInk" aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse " id="navbarLiteraryInk">
					<ul className="navbar-nav me-auto mb-lg-0">

						<li className="nav-item">
							<Link to="/posts">
								<button className="btn border border-0 mt-1 "> Publicaciones </button>
							</Link>
						</li>

						<li className="nav-item">
							<Link to="/author-list">
								<button className="btn border border-0 mt-1"> Autores </button>
							</Link>
						</li>

						<li className="nav-item dropdown ">
							<a className="nav-link dropdown-toggle border border-0" href="#" role="button"
								data-bs-toggle="dropdown" aria-expanded="false">
								Servicios
							</a>

							<ul class="dropdown-menu">

								<li className="list-group-item-action">
									<Link to="/pen-to-print">
										<button className="btn border border-0 py-1">Pen to Print </button>
									</Link>
								</li>

								<li className="list-group-item-action">
									<Link to="/reviews">
										<button className="btn border border-0 py-1"> Reviews</button>
									</Link>
								</li>

								<li className="list-group-item-action">
									<Link to="/mentories">
										<button className="btn border border-0 py-1"> Mentorías </button>
									</Link>
								</li>
							</ul>
						</li>
					</ul>

					<div>
						<button className="btn border-0 mx-3" data-bs-toggle="modal" data-bs-target="#navbarModal">
							<FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
						</button>
					</div>
					<div className="row g-0 ">						
						{login?	<BotonLogged/>: <BotonIngresar/> }
					</div>

				</div>
			</div>

			<div className="modal fade" id="navbarModal" tabindex="-1" aria-labelledby="navbarModalLabel" aria-hidden="true"  >
				<div className="modal-dialog" >
					<div className="modal-content" >
						<form className="w-100">
							<input type="text" className="form-control w-100" id="recipient-name" placeholder="Busca por categoría, autor, título..." />
						</form>
					</div>
				</div>
			</div>

		</nav>
	);
};

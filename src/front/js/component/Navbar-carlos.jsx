import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import pic from "../../img/camus.jpeg"


export const Navbar = () => {
	return (
		<nav class="navbar navbar-expand-md navbar-dark">
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
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">

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
					<div className="row pe-5 me-5">
						<div className="col">
							<Link to="/login">
								<button className="btn btn-warning fw-bold text-dark"> Ingresa </button>
							</Link>
						</div>
						<div className="dropdown col pt-2">
							<a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
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

import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


export const Navbar = () => {
	return (
		<nav class="navbar navbar-expand-md navbar-dark">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					<img src={Logo} alt="LiteraryInk logo" style={{ width: '8rem' }} />
				</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarLiteraryInk" aria-controls="navbarLiteraryInk" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>				
				<div className="collapse navbar-collapse " id="navbarLiteraryInk">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to="/post-edit">
								<button className="btn border border-0 mt-1 "> Categorías </button>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/author-list">
								<button className="btn border border-0 mt-1"> Autores </button>
							</Link>
						</li>
						<li className="nav-item dropdown ">
							<a className="nav-link dropdown-toggle border border-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Servicios
							</a>
							<ul class="dropdown-menu">
								<li><Link className="dropdown-item" to="/pen-to-print"> Pen to Print </Link></li>
								<li><Link className="dropdown-item" to="/reviews"> Reviews </Link></li>
								<li><Link className="dropdown-item" to="/mentories"> Mentorías </Link></li>
							</ul>
						</li>
					</ul>
					<Link to="/">
						<button className="btn border-0 mx-3"> <FontAwesomeIcon icon={faMagnifyingGlass} size="xl"/>  </button>
					</Link>
					<Link to="/shopping-cart">
						<button className="btn btn-warning fw-bold text-dark"> Carrito </button>
					</Link>
					<Link to="/login">
						<button className="btn btn-warning fw-bold text-dark"> Ingresa </button>
					</Link>					
				</div>
			</div>
		</nav>
	);
};

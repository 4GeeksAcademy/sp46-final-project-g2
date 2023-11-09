import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";


export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-md navbar-dark ">
			<div className="container-fluid ">
				
				<div className="">
					<Link to="/">
						<img src={Logo} alt="LiteraryInk logo" style={{ width: '8rem' }} />
					</Link>
				</div>
				
				<div className="">
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
						data-bs-target="#navbarLiteraryInk" aria-controls="navbarLiteraryInk" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
				</div>
				
				<div className="collapse navbar-collapse" id="navbarLiteraryInk">
					<div className="mx-auto">
						<ul className="navbar-nav me-auto mb-2 mb-sm-0">
							
							<li className="nav-item" style={{ width: '200px' }}>
								<form role="search">
									<input className="form-control" type="search" placeholder="Buscar" />
								</form>
							</li>

							<li className="nav-item">
								<a class="nav-link" aria-current="page" href="/categories"> Categorias </a>
							</li>

							<li className="nav-item">
								<a class="nav-link" aria-current="page" href="/authors"> Autores </a>
							</li>

							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Servicios</a>
								<ul className="dropdown-menu">
									<li><a className="dropdown-item" href="/pen-to-write"> Pen to Write </a></li>
									<li><a className="dropdown-item" href="reviews"> Reviews </a></li>
									<li><a className="dropdown-item" href="Talleres"> Talleres </a></li>
								</ul>
							</li>

							<li className="nav-item">
								<Link to="/login">
									<button className="btn btn-warning"> Ingresa </button>
								</Link>
							</li>

						</ul>

					</div>
				</div>
			</div>
		</nav>
	);
};

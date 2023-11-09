import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";


export const Navbar = () => {
	return (
		<nav class="navbar navbar-expand-md navbar-dark">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">
					<img src={Logo} alt="LiteraryInk logo" style={{ width: '8rem' }} />
				</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarLiteraryInk" aria-controls="navbarLiteraryInk" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarLiteraryInk">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a class="nav-link" aria-current="page" href="/categories"> Categorías </a>
						</li>
						<li class="nav-item">
							<a class="nav-link" aria-current="page" href="/authors"> Autores </a>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Servicios
							</a>
							<ul class="dropdown-menu">
								<li><a className="dropdown-item" href="/pen-to-write"> Pen to Write </a></li>
								<li><a className="dropdown-item" href="reviews"> Reviews </a></li>
								<li><a className="dropdown-item" href="Talleres"> Talleres </a></li>
							</ul>
						</li>
						<li>
							<form role="search">
								<input className="form-control" type="search" placeholder="Buscar" />
							</form>
						</li>
					</ul>
					<Link to="/login">
						<button className="btn btn-warning"> Ingresa </button>
					</Link>
				</div>
			</div>
		</nav>
	);
};

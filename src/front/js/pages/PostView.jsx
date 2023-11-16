import React from "react";
import casa from "../../img/casa.jpg"
import { Link } from "react-router-dom";

export const PostView = () => {
    return (
        <div className="container mt-5">
            <div className="card mt-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <h2 className="pb-4 mb-4 fst-italic border-bottom">
                                La casa de los susurros
                            </h2>
                            <img
                                src={casa}
                                alt="Imagen de la publicación"
                                className="img-fluid d-block mx-auto mb-4"
                            />
                            <article className="blog-post" style={{ textAlign: 'justify', maxWidth: '100%' }}>
                                <p className="blog-post-meta">13-Diciembre-2020,  de <Link to="/author-profile">Albert Camus</Link></p>
                                <p> En el pequeño pueblo de Elmsworth, rodeado de colinas verdes y bosques frondosos, se alzaba una casa antigua y enigmática. La Casa de los Susurros, como la llamaban los lugareños, tenía una historia que se transmitía de generación en generación. Dicen que, en sus oscuros pasillos y habitaciones sombrías, se ocultaba un misterio que había desconcertado a los habitantes durante décadas.</p>
                                <p> Los lugareños evitaban pasar cerca de la casa cuando caía la noche, temerosos de los susurros que se decía se escuchaban entre las sombras. Se rumoreaba que las paredes tenían oídos y que, si prestabas atención, podías captar murmullos incomprensibles que parecían provenir de lo más profundo de la estructura.</p>
                                <p> Una tarde de otoño, Emily, una joven valiente y curiosa, decidió explorar la Casa de los Susurros. Armada con una linterna y su coraje, cruzó el umbral de la casa en busca de respuestas. El interior estaba envuelto en un silencio sepulcral, solo interrumpido por el eco de sus propios pasos.</p>
                                <p> Mientras exploraba las habitaciones polvorientas, Emily sintió un escalofrío recorrer su espalda. De repente, la linterna parpadeó, lanzando destellos de luz que revelaron sombras danzantes en las paredes. Los susurros parecían intensificarse, transformándose en susurros ininteligibles que resonaban en sus oídos.</p>
                                <p> En la última habitación, Emily descubrió un antiguo diario, cubierto de polvo y olvidado en un rincón oscuro. Entre sus páginas desgastadas, leyó relatos de amores perdidos, secretos oscuros y tragedias familiares. La historia de la casa comenzó a revelarse lentamente, como un rompecabezas que tomaba forma.</p>
                                <p> Emily se dio cuenta de que los susurros no eran más que ecos del pasado, voces atrapadas en el tiempo que buscaban ser escuchadas. Al comprender la historia de la Casa de los Susurros, la energía que envolvía la casa pareció calmarse. La oscuridad cedió ante la luz, y el misterio que tanto desconcertó a Elmsworth comenzó a desvanecerse.</p>
                                <p>Desde ese día, la Casa de los Susurros dejó de ser un enigma temido y se convirtió en parte de la rica historia del pueblo. Los susurros se desvanecieron, pero la lección perduró: a veces, enfrentarse a los misterios del pasado es la única manera de liberarse de su abrazo.</p>
                                <div className="tags mt-3">
                                    <strong>Etiquetas:</strong> #misterio, #thriller, #terror
                                </div>
                            </article>
                        </div>
                        <div className="col-lg-4 col-md-12" style={{ marginTop: '30px'}}>
                            <div>
                                <div>
                                    <h5 className="fst-italic">Publicaciones recientes</h5>
                                    <ul className="list-unstyled">
                                        <li>
                                            <a className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="#">
                                                <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
                                                <div className="col-lg-8">
                                                    <h6 className="mb-0">La despedida</h6>
                                                    <small className="text-body-secondary">January 15, 2023</small>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="#">
                                                <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
                                                <div className="col-lg-8">
                                                    <h6 className="mb-0">El lago de cristal</h6>
                                                    <small className="text-body-secondary">January 14, 2023</small>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="#">
                                                <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
                                                <div className="col-lg-8">
                                                    <h6 className="mb-0">Ojos violeta</h6>
                                                    <small className="text-body-secondary">January 13, 2023</small>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="p-4">
                                    <h5 className="fst-italic">Archivos</h5>
                                    <ol className="list-unstyled mb-0">
                                        <li><a href="#">Marzo 2021</a></li>
                                        <li><a href="#">Febrero 2021</a></li>
                                        <li><a href="#">Enero 2021</a></li>
                                        <li><a href="#">Diciembre 2020</a></li>
                                        <li><a href="#">Noviembre 2020</a></li>
                                        <li><a href="#">Octubre 2020</a></li>
                                        <li><a href="#">Septiembre 2020</a></li>
                                        <li><a href="#">Agosto 2020</a></li>
                                        <li><a href="#">Julio 2020</a></li>
                                        <li><a href="#">Junio 2020</a></li>
                                        <li><a href="#">Mayo 2020</a></li>
                                        <li><a href="#">Abril 2020</a></li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import casa from "../../img/casa.jpg"
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { PostElement } from "../component/PostElement.jsx";

export const PostView = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    useEffect( () => {
        actions.setAuthorIdNumber(store.selectedPost[0].author_id);
        actions.getPostsByAuthors();
    },[])

    if (store.selectedPost.length == 1) {
        return (
            <div className="container mt-5">
                <div className="card mt-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-8 col-md-12">
                                <h2 className="pb-4 mb-4 fst-italic border-bottom">
                                    {store.selectedPost[0].title}
                                </h2>
                                <img
                                    src={casa}
                                    alt="Imagen de la publicación"
                                    className="img-fluid d-block mx-auto mb-4"
                                />
                                <article className="blog-post" style={{ textAlign: 'justify', maxWidth: '100%' }}>
                                    <p className="blog-post-meta">{store.selectedPost[0].created_date}<Link to="/authors"> Autor </Link></p>
                                    <p> {store.selectedPost[0].text} </p>

                                    <div className="tags mt-3">
                                        <strong>Etiquetas:</strong> {store.selectedPost[0].tag}
                                    </div>
                                </article>
                            </div>
                            <div className="col-lg-4 col-md-12" style={{ marginTop: '30px' }}>
                                <div>
                                    <div>
                                        <h5 className="fst-italic">Publicaciones recientes</h5>
                                        <ul className="list-unstyled">
                                            {store.postsByAuthor.map((post) =>
                                                <li> {<PostElement titulo={post.title} fecha={post.created_date} />} </li>
                                            )}
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
        );
    } else {
        return (
            <div> {navigate('/')} </div>
        );
    }
}
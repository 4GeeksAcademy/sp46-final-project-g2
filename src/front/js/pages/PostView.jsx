import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import casa from "../../img/casa.jpg"
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { PostElement } from "../component/PostElement.jsx";
import { Cover } from "./Cover.jsx";

export const PostView = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    let authorP = []
    const [authorName, setAuthorName] = useState('')
    

    useEffect(() => {
        actions.getPostsByAuthors();
        if (store.authorsList.length > 0) {
            authorP = store.authorsList.filter((item) => item.id == store.selectedPost[0].author_id)      
            setAuthorName(authorP[0].alias)
            console.log()
        }
    }, [])

    const handleEdit = () => {
        if (editOn) {
            actions.editProfile(newAlias,newBirthDate,newCity,newCountry,newQuote)
            setCancelOn(false);
            setEditOn(false);
        } else {
            setEditOn(true);
            setCancelOn(true);
        }
    }

    const handleCancelar = () => {
        setEditOn(false);
        setCancelOn(false);
    }
   
    return (
        store.selectedPost.length > 0 ?
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
                                    <p className="blog-post-meta">{store.selectedPost[0].created_date} - {authorName} </p>
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
                                                <li key={post.id}> {<PostElement key={post.id} author={post.author_id} 
                                                titulo={post.title} fecha={post.created_date} />} </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="p-4">
                                        <h5 className="fst-italic">Archivos</h5>
                                        <ol className="list-unstyled mb-0">
                                        {store.postsByAuthor.map((post) =>
                                             <li key={post.id}> {new Date(post.created_date).getMonth()} / {new Date(post.created_date).getFullYear()} </li>
                                        )}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <Cover />
    )
}
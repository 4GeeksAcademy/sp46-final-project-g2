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
    const [selReview, setSelReview] = useState(2)
    const [revText, setRevText] = useState("Esta fascinante narración de misterio me envolvió desde la primera página hasta la última con su trama ingeniosamente construida y personajes intrigantes. El autor ha tejido hábilmente una red de misterios y giros que mantuvieron mi atención en vilo en todo momento. La ambientación cuidadosamente detallada y la atmósfera misteriosa añadieron capas de suspense, creando un escenario perfecto para una historia que mantuvo mi mente activa tratando de descifrar cada pista. Los personajes están hábilmente desarrollados, cada uno con su propio conjunto de secretos y motivaciones, lo que añadió profundidad a la trama y mantuvo mi interés en descubrir más sobre ellos. La resolución del misterio fue sorprendente y satisfactoria, y el autor/a demostró un talento excepcional para mantener el suspenso hasta el final. En resumen, esta narración de misterio es un viaje emocionante lleno de intriga y sorpresas. Recomiendo encarecidamente esta obra a los amantes del género, ya que ofrece una experiencia de lectura cautivadora que dejará a los lectores ansiosos por más. ¡Una verdadera joya del misterio que no decepcionará a aquellos que buscan una historia envolvente y bien elaborada!")

    const reviews = {
        1: "Esta fascinante narración de misterio me envolvió desde la primera página hasta la última con su trama ingeniosamente construida y personajes intrigantes. El autor ha tejido hábilmente una red de misterios y giros que mantuvieron mi atención en vilo en todo momento. La ambientación cuidadosamente detallada y la atmósfera misteriosa añadieron capas de suspense, creando un escenario perfecto para una historia que mantuvo mi mente activa tratando de descifrar cada pista. Los personajes están hábilmente desarrollados, cada uno con su propio conjunto de secretos y motivaciones, lo que añadió profundidad a la trama y mantuvo mi interés en descubrir más sobre ellos. La resolución del misterio fue sorprendente y satisfactoria, y el autor/a demostró un talento excepcional para mantener el suspenso hasta el final. En resumen, esta narración de misterio es un viaje emocionante lleno de intriga y sorpresas. Recomiendo encarecidamente esta obra a los amantes del género, ya que ofrece una experiencia de lectura cautivadora que dejará a los lectores ansiosos por más. ¡Una verdadera joya del misterio que no decepcionará a aquellos que buscan una historia envolvente y bien elaborada!",
        2: "Este ensayo literario es una joya intelectual que destaca por su profunda perspicacia y estilo impecable. El autor/a demuestra una comprensión magistral de la materia, tejiendo ideas con elegancia y claridad. Cada página revela una mente aguda y reflexiva que invita a la contemplación. La prosa es cautivadora, llevándonos en un viaje intelectual que enriquece nuestra comprensión del tema. Este ensayo no solo informa, sino que también inspira, dejando una impresión duradera. Una obra maestra que debería figurar en la biblioteca de cualquier amante de la literatura y el pensamiento profundo."

    }

    useEffect(() => {
        actions.getPostsByAuthors();
        setSelReview((Math.random() * 3))
        setRevText(reviews[selReview])
        if (store.authorsList.length > 0) {
            authorP = store.authorsList.filter((item) => item.id == store.selectedPost[0].author_id)
            setAuthorName(authorP[0].alias)
        }
    }, [])

    const handleEdit = () => {
        if (editOn) {
            actions.editProfile(newAlias, newBirthDate, newCity, newCountry, newQuote)
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
            <div className="container mt-5" style={{ minHeight: "790px" }}>
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
                                    <div className="accordion mt-5" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" 
                                                data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Reviews de los expertos
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <strong>Robert McKey:</strong> {revText}
                                                </div>
                                            </div>
                                        </div>



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
                                    {/*}
                                    <div className="p-4">
                                        <h5 className="fst-italic">Archivos</h5>
                                        <ol className="list-unstyled mb-0">
                                            {store.postsByAuthor.map((post) =>
                                                <li key={post.id}> {new Date(post.created_date).getMonth()} / {new Date(post.created_date).getFullYear()} </li>
                                            )}
                                        </ol>
                                    </div>
                                    */}
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
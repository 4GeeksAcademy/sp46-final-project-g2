import React, { useContext, useState } from "react";
import { ImageUpload } from "../component/ImageUpload.jsx";
import { Context } from "../store/appContext.js";
import { Cover } from "./Cover.jsx"

export const PostEdit = () => {
    const { store, actions } = useContext(Context);
    const [nTitle, setNTitle] = useState('');
    const [nTag, setNTag] = useState('');
    //const [nDate, setNDate] = useState();
    const [nText, setNText] = useState('');

    const handleCreatePost = async () => {
        await actions.createPost(nTitle, nTag, nText);
    }

    return (
        store.isLogged?
        <div className="container mt-5">
            <h1>Editor de Texto</h1>
            <div className="card mt-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <div className="form-group">
                                <label htmlFor="title" className="font-weight-bold">Título:</label>
                                <input
                                    id="title"
                                    type="text"
                                    className="form-control"
                                    contentEditable="true"
                                    placeholder="Ingresa el título aquí"
                                    onChange={(e) => { setNTitle(e.target.value) }}
                                    style={{
                                        backgroundColor: "#dcdcdc",
                                        padding: "10px",
                                        border: "1px solid #b0b0b0",
                                        borderRadius: "5px"
                                    }}
                                    value={nTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="editor" className="font-weight-bold mt-3">Etiquetas:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tags"
                                    contentEditable="true"
                                    placeholder="Separar con comas"
                                    onChange={(e) => { setNTag(e.target.value) }}
                                    style={{
                                        backgroundColor: "#dcdcdc",
                                        padding: "10px",
                                        border: "1px solid #b0b0b0",
                                        borderRadius: "5px"
                                    }}
                                    value={nTag}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="editor" className="font-weight-bold mt-3">Contenido:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Text"
                                    contentEditable="true"
                                    placeholder=""
                                    onChange={(e) => { setNText(e.target.value) }}
                                    style={{
                                        backgroundColor: "#dcdcdc",
                                        padding: "10px",
                                        border: "1px solid #b0b0b0",
                                        borderRadius: "5px",
                                        minHeight: "300px"
                                    }}
                                    value={nText}
                                />
                            </div>
                            <div className="my-3">
                                <label className="font-weight-bold">Fecha de Publicación: <span>{new Date().toLocaleDateString()} </span></label>

                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div>
                                <ImageUpload />
                            </div>
                        </div>

                    </div>
                    <div className=" m-3 d-flex justify-content-between">
                        <button className="btn btn-warning fw-bold text-dark mr-2" onClick={handleCreatePost}>Publicar</button>
                        {/*
                    <div className="d-flex">
                        <button className="btn btn-outline-primary mr-2">Guardar</button>
                        <button className="btn btn-outline-primary">Vista Previa</button>
                    </div>
                    */}
                    </div>
                </div>
            </div>
        </div >
        :
        <Cover />
    );
};


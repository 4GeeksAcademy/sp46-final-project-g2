import React from "react";

export const PostEdit = () => {
    return (
        <div className="container mt-5">
            <h1>Editor de Texto</h1>
            <div className="card mt-4">
                <div className="card-body d-flex">
                    <div style={{ flex: "1" }}>
                        <div className="form-group">
                            <label htmlFor="title" className="font-weight-bold">Título:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Ingresa el título aquí"
                                style={{ 
                                    backgroundColor: "#dcdcdc",
                                    padding: "10px",
                                    border: "1px solid #b0b0b0",
                                    borderRadius: "5px"
                                }}
                            />
                        </div>
                        <label htmlFor="editor" className="font-weight-bold mt-3">Contenido:</label>
                        <div
                            id="editor"
                            className="form-control border-1 p-0"
                            contentEditable="true"
                            style={{
                                minHeight: "400px",
                                minWidth: "200px",
                                backgroundColor: "#dcdcdc",
                                padding: "10px",
                                border: "1px solid #b0b0b0",
                                borderRadius: "5px",
                            }}
                        />
                    </div>
                    <div className="m-5 ">
                        <div className="mb-3">
                        <label htmlFor="editor" className="font-weight-bold mt-3">Etiquetas:</label>
                        <input 
                                type="text" 
                                className="form-control"  
                                id="tags"
                                contentEditable="true"
                                placeholder="Separar con comas"
                                style={{ 
                                    backgroundColor: "#dcdcdc",
                                    padding: "10px",
                                    border: "1px solid #b0b0b0",
                                    borderRadius: "5px",
                                    height: "80px",
                                    width: "100%",
                                    color: "#555"
                                }} 
                        />
                        </div>
                        <div className="mb-4">
                            <label className="font-weight-bold">Fecha de Publicación:</label>
                            <p>{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
                <div className="m-3 d-flex justify-content-between">
                    <button className="btn btn-warning fw-bold text-dark mr-2">Publicar</button>
                    <div className="d-flex">
                        <button className="btn btn-outline-primary mr-2">Guardar</button>
                        <button className="btn btn-outline-primary">Vista Previa</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

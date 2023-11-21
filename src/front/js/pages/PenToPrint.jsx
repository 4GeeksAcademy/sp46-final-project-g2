import React from "react";
import { Link } from "react-router-dom";


export const PenToPrint = () => {
    return (
        <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 py-3">
                <h2 className="display-5">Pen to Print</h2>
                <p className="lead">Transcriba sus notas manuscritas a texto digital.</p>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-8">
                        <div className="bg-body-tertiary shadow-sm mb-4"
                            style={{
                                borderRadius: '21px 21px 0 0',
                                background: '#dcdcdc',
                                position: 'relative',
                                zIndex: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}>
                            <p className="m-5"
                                style={{
                                    position: 'relative',
                                    zIndex: 1,
                                    color: 'black',
                                    textAlign: 'justify',
                                    lineHeight: '1.5',
                                    maxWidth: '80%',
                                }}>
                                Con Pen to Print, cualquier palabra escaneada, imagen o archivo PDF se puede convertir de escritura
                                a mano a texto o documento. Las aplicaciones móviles y el reconocimiento óptico de caracteres
                                (OCR) en línea de Pen to Print están diseñados específicamente para reconocer la escritura a mano
                                y funcionan de manera excelente como lector de cursiva y para descifrar escritura ilegible al
                                convertir notas a texto.
                            </p>
                            <div className="row">
                                <div className="col-md-8 m-2" style={{ border: '2px solid black', borderRadius: '21px 21px 0 0' }}>
                                    <div className="card mb-4 box-shadow" >
                                        <h4 className="my-0 font-weight-normal">LiteraryInk Miembro</h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title" style={{ fontSize: '20px', color: 'black' }}>23,95€/mes</h1>
                                        <ul className="list-unstyled mt-3 mb-4" style={{ color: 'black' }}>
                                            <li>Acceso a Pen to Write</li>
                                            <li>20€ Dto en talleres</li>
                                            <li>3 reviews incluidas</li>
                                        </ul>
                                        <Link to="/signup-member">
                                        <button type="button" className="btn btn-warning fw-bold text-dark mr-2 mb-4">Hazte miembro</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-grey text-white">
                            <div className="card-body">
                                <h2 className="card-title">Te ofrecemos:</h2>
                                <ul className="list" style={{ textAlign: 'justify', fontSize: '15px' }}>
                                    <li>1000 páginas escaneadas.</li>
                                    <li>Descargar como archivos de texto o Word, o copiar al portapapeles.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};
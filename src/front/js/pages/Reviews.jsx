
import React from "react";

export const Reviews = () => {
    return (
        <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 py-3">
                <h2 className="display-5">Reviews</h2>
                <p className="lead">¿Está en búsqueda de una evaluación literaria de alta calidad?</p>
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
                                Nuestro distinguido equipo de críticos literarios, con amplia experiencia académica,
                                se compromete a realizar una minuciosa revisión de la obra que usted desee,
                                aplicando rigurosamente el método técnico de revisión por pares.
                                En este proceso, se enfatiza la objetividad y la acreditación,
                                asegurando así una evaluación crítica fundamentada y de excelencia.
                            </p>
                            <div className="row">
                                <div className="col-md-4 m-2" style={{border: '2px solid black', borderRadius: '21px 21px 0 0'}}>
                                    <div className="card mb-4 box-shadow" >
                                    <h4 className="my-0 font-weight-normal">Review Unitaria</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title" style={{fontSize: '20px', color: 'black'}}>11,95€</h1>
                                    <button type="button" className="btn btn-warning fw-bold text-dark mr-2 mt-4">Comprar</button>
                                    </div>
                                </div>
                                <div className="col-md-5 m-2" style={{border: '2px solid black', borderRadius: '21px 21px 0 0'}}>
                                    <div className="card mb-4 box-shadow" >
                                    <h4 className="my-0 font-weight-normal">LiteraryInk Miembro</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title" style={{fontSize: '20px', color: 'black'}}>23,95€/mes</h1>
                                    <ul className="list-unstyled mt-3 mb-4" style={{color: 'black'}}>
                                        <li>3 reviews incluidas</li>
                                        <li>20€ Dto en talleres</li>
                                        <li>Acceso a Pen to Write</li>
                                    </ul>
                                    <button type="button" className="btn btn-warning fw-bold text-dark mr-2 mb-4">Hazte miembro</button>
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
                                    <li>Evaluación crítica de 400 palabras.</li>
                                    <li>Publicación de sus revisiones con nuestro distintivo sello de acreditación.</li>
                                    <li>Comparativa literaria con obras afines.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};
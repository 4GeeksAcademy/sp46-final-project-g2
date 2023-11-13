import React from "react";


export const Mentories = () => {
    return (
        <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 py-3">
                <h2 className="display-5">Mentorías</h2>
                <p className="lead">¿Quieres publicar tu libro y no sabes cómo?</p>
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
                                Nos comprometemos a acompañarte durante todo el proceso.
                                Tú decides el momento idóneo para iniciar este camino.
                                Desde el despliegue de tu fase creativa hasta la exploración de opciones editoriales y
                                otros recursos para concretar tu obra literaria.
                            </p>
                            <div className="row">
                                <div className="col-md-4 m-2" style={{ border: '2px solid black', borderRadius: '21px 21px 0 0' }}>
                                    <div className="card mb-4 box-shadow" >
                                        <h4 className="my-0 font-weight-normal">Taller completo</h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title" style={{ fontSize: '20px', color: 'black' }}>359€</h1>
                                        <button type="button" className="btn btn-warning fw-bold text-dark mr-2 mt-4">Comprar</button>
                                    </div>
                                </div>
                                <div className="col-md-5 m-2" style={{ border: '2px solid black', borderRadius: '21px 21px 0 0' }}>
                                    <div className="card mb-4 box-shadow" >
                                        <h4 className="my-0 font-weight-normal">LiteraryInk Miembro</h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title" style={{ fontSize: '20px', color: 'black' }}>23,95€/mes</h1>
                                        <ul className="list-unstyled mt-3 mb-4" style={{ color: 'black' }}>
                                            <li>20% Dto en talleres</li>
                                            <li>3 reviews incluidas</li>
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
                                    <li>Sesiones de mentoría online de 50 minutos cada una.</li>
                                    <li>Selección personalizada del mentor de entre nuestros profesionales.</li>
                                    <li>Flexibilidad para adaptarnos a tu horario y a tus necesidades específicas.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};
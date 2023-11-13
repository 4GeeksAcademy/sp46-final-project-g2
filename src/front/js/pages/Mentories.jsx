import React from "react";


export const Mentories = () => {
    return (
        <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 py-3">
                <h2 className="display-5">Mentorías</h2>
                <p className="lead">¿Quieres publicar tu libro y no sabes cómo?</p>
            </div>
            <div className="bg-body-tertiary shadow-sm mx-auto" style={{ width: '80%', height: '300px', borderRadius: '21px 21px 0 0', background: '#dcdcdc', position: 'relative', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p className=" m-5" style={{ position: 'relative', zIndex: 1, color: 'black', textAlign: 'justify', lineHeight: '1.5', maxWidth: '60%' }}>
                    Nos comprometemos a acompañarte durante todo el proceso.
                    Tú decides el momento idóneo para iniciar este camino.
                    Desde el despliegue de tu fase creativa hasta la exploración de opciones editoriales y
                    otros recursos para concretar tu obra literaria.
                </p>
                <div className="container m-5">
                    <div className="card bg-dark text-white">
                        <div className="card-body">
                            <h2 className="card-title">Te ofrecemos:</h2>
                            <ul className="list" style={{textAlign: 'justify', fontSize: '15px'}}>
                                <li>Sesiones de mentoría online de 50 minutos cada una.</li>
                                <li>Selección personalizada del mentor de entre nuestros profesionales.</li>
                                <li>Flexibilidad para adaptarnos a tu horario y a tus necesidades específicas.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
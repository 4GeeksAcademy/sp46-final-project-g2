import React from "react";

export const ContactUs = () => {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '610px' }}>
            <form style={{ width: "400px" }}>
                <div className="form-group">
                    <label htmlFor="fname">Nombre</label>
                    <input id="fname" name="name" type="text" placeholder="Nombre" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="text" placeholder="Email" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input id="phone" name="phone" type="text" placeholder="Teléfono" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Mensaje</label>
                    <textarea className="form-control" id="message" name="message" placeholder="Escribe aquí tu mensaje. Responderemos lo más pronto posible." rows="7"></textarea>
                </div>
                <div className="form-group">
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning fw-bold text-dark mt-4">Enviar</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

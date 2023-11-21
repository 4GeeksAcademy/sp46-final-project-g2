import React from "react";
import { BotonPago } from "./BotonPago.jsx";

export const BotonPagoTest = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Carrito de compra</h1>
      <p className="text-start">Tu Servicio</p>
      <p className="text-start">Otro Servicio</p>
      <BotonPago />
    </div>
  )
}


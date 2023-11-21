import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const BotonPago = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()

  useEffect(() => {
    async function setUpStripe() {
      // if (store.member.id) {
        await actions.getStripePublicKey()
      /* } else {
        navigate("/")
        alert("You are not a member")
      } */
    }
    
    setUpStripe()
  }, [])

  return (
    <div className="d-flex justify-content-end my-5 me-5 pt-4">
      <div className="align-content-center">
        <button className="btn btn-warning fw-bold text-dark w-100 " onClick={() => actions.processPayment()}>
          Finalizar Compra
        </button>
      </div>
    </div>

  )
}


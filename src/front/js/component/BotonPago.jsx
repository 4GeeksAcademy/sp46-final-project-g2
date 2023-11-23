import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { loadStripe } from '@stripe/stripe-js';

export const BotonPago = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()
  const [stripeKey, setStripeKey] = useState('');

  useEffect(() => {
    function setUpStripe() {
      // if (store.member.id) {
        // actions.getStripePublicKey()
      /* } else {
        navigate("/")
        alert("You are not a member")
      } */
      getStripePublicKey();
    }
    
    setUpStripe()
  }, [])

 const getStripePublicKey= async () => {
    const url = `${process.env.BACKEND_URL}/stripe-key`
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      setStripeKey(data.publicKey);
      return true
    } else {
      console.log('Error:', response.status, response.statusText);
      return false
    }
  };

  const processPayment= async () => {
    const stripe = await loadStripe(stripeKey)
    const url = `${process.env.BACKEND_URL}/payment`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.token}`
      },
      body: JSON.stringify({})
    }
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      console.log('Error:', response.status, response.statusText);
    }
  }


  return (
    <div className="d-flex justify-content-end my-5 me-5 pt-4">
      <div className="align-content-center">
        <button className="btn btn-warning fw-bold text-dark w-100 " onClick={() => processPayment()}>
          Comprar
        </button>
      </div>
    </div>

  )
}


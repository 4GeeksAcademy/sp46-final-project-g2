import React, { useState, useEffect } from "react";
// import { loadStripe } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout} from '@stripe/react-stripe-js';
// import {  Navigate } from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
// const stripePromise = loadStripe("pk_test_Dt4ZBItXSZT1EzmOd8yCxonL");
const stripePromise = loadStripe(process.env.STRIPE_API_KEY)

export const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState('');


  const requestPayment = async () => {
    const url = process.env.BACKEND_URL + "/api/create-checkout-session";
    const options = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "Origin"
      },
      body: JSON.stringify({})
    };
    console.log(url, options)
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json();
      console.log(data)
    } else {
      console.log('error:' , response.status, response.statusText);
    }
  }

  
  useEffect(() => {
    requestPayment();
    /* 
    fetch(process.env.BACKEND_URL + "/api/create-checkout-session", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "Origin"
      },
      body: JSON.stringify({})
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    */
  }, []);
  

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{clientSecret}}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}


/* 
const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === 'open') {
    return (
      <Navigate to="/checkout" />
    )
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null;
}

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/return" element={<Return />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
 */
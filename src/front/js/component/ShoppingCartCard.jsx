import React from "react"
import { Link } from "react-router-dom";


export const ShoppingCartCard = () => {
  return (

    <div className="card pb-2">
      <div className="card-body row mb-1">
        <div className="col-8">
          <p className="card-text my-2">Subtotal</p>
        </div>
        <div className="col-4">
          <p className="card-text my-2">75,00 €</p>
        </div>
        <div className="border-bottom"></div>
        <div className="col-8">
          <p className="card-text my-2">Total</p>
        </div>
        <div className="col-4">
          <p className="card-text my-2">75,00 €</p>
        </div>
        <div>
        <Link to="/bill">
          <button className="btn btn-warning fw-bold text-dark w-100 mt-3"> Tramitar pedido </button>
        </Link>
      </div>
      </div>
      
    </div>
  );
};
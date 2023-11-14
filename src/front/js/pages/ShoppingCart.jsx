import React from "react";
import { HorizontalCard } from "../component/HorizontalCard.jsx";
import { ShoppingCartList } from "../component/ShoppingCartList.jsx";
import { ShoppingCartCard } from "../component/ShoppingCartCard.jsx";


export const ShoppingCart = () => {
    return (
        <div className="container bg-dark text-light mb-5">
            <h2 className="mt-4 text-body-primary"> Cesta </h2>
            <div className="row pt-5 border-top">
                <div className="col-8">
                    <ShoppingCartList />
                </div>
                <div className="col-4">
                <ShoppingCartCard/>
                </div>
            </div>
        </div>
    );
};
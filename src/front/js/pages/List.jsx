import React from "react";
import { HorizontalCard } from "../component/HorizontalCard.jsx";


export const List = () => {
    return (
        <div className="container bg-dark text-light">
            <h2 className="mt-4 text-body-primary"> CATEGORIAS </h2>
            <div className="pt-5 border-top">
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
            </div>
        </div>
    );
};
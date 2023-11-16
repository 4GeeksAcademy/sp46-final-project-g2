import React from "react";
import { AuthorCard } from "../component/AuthorCard.jsx";


export const AuthorList = () => {
    return (
        <div className="container bg-dark text-light mb-5">
            <h2 className="mt-4 text-body-primary"> AUTORES </h2>
            <div className="pt-5 border-top">
                <AuthorCard />
                <AuthorCard />
                <AuthorCard />
                <AuthorCard />
                <AuthorCard />
                <AuthorCard />
                <AuthorCard />
                <AuthorCard />
                <AuthorCard />
                <AuthorCard />
            </div>
        </div>
    );
};
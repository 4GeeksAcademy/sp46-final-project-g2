import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { AuthorCard } from "../component/AuthorCard.jsx";


export const AuthorList = () => {
    const { store, actions } = useContext(Context);
    

    useEffect(() => {
        actions.getAuthors();
    }, []);

    return (
        <div className="container bg-dark text-light mb-5">
            <h2 className="mt-4 text-body-primary"> AUTORES </h2>
            
            <div className="pt-5 border-top" >                
                {store.authorsList.map((author) =>                    
                    <AuthorCard alias={author.alias} aboutMe={author.about_me} idNumber={author.id}/>                    
                )}               
            </div>
            
        </div>
    );
};
import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { AuthorCard } from "../component/AuthorCard.jsx";
import { Spinner } from "../component/Spinner.jsx";


export const AuthorList = () => {
    const { store, actions } = useContext(Context);
    const [timeUp, setTimeUp] = useState(true)
    const timing = timeUp;

    useEffect(() => {
        actions.getAuthors();
    }, []);

    return (
        <div className="container bg-dark text-light mb-5">
            <h2 className="mt-4 text-body-primary"> AUTORES </h2>
            <div className="pt-5 border-top" >

                {store.authorsList == 0 ?
                   <Spinner/>
                    :
                    <div>
                        {store.authorsList.map((author) =>
                            <AuthorCard key={author.id} alias={author.alias} aboutMe={author.about_me} idNumber={author.id} />
                        )}
                    </div>
                }
            </div>
        </div>
    );
};
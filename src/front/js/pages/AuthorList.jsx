import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { AuthorCard } from "../component/AuthorCard.jsx";


export const AuthorList = () => {
    const { store, actions } = useContext(Context);
    const [timeUp, setTimeUp] = useState(true)
    const timing = timeUp;

    useEffect(() => {
        actions.getAuthors();
        setTimeout(() => {
            setTimeUp(false)
        }, 1000)
    }, []);

    return (
        <div className="container bg-dark text-light mb-5">
            <h2 className="mt-4 text-body-primary"> AUTORES </h2>
            <div className="pt-5 border-top" >

                {timing ?
                    <div className="conteiner text-center " style={{ minHeight: "620px" }}>
                        <div className="mt-5 pt-5">
                            <div className="mt-5 pt-5">
                                <div className="pt-5">
                                    <div className=" spinner-grow text-warning mt-5 mx-1" role="status" style={{ height: "3rem", width: "3rem" }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <div className=" spinner-grow text-warning mt-5  mx-1" role="status" style={{ height: "3rem", width: "3rem" }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <div className=" spinner-grow text-warning mt-5  mx-1" role="status" style={{ height: "3rem", width: "3rem" }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        {store.authorsList.map((author) =>
                            <AuthorCard alias={author.alias} aboutMe={author.about_me} idNumber={author.id} />
                        )}
                    </div>
                }
            </div>
        </div>
    );
};
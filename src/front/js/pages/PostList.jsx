import React, { useContext, useEffect, useState } from "react";
import { PostCard } from "../component/PostCard.jsx";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";


export const PostList = () => {
    const { store, actions } = useContext(Context);
    const [timeUp, setTimeUp] = useState(true)
    const timing = timeUp;

    useEffect(() => {
        actions.relationPostAuthor();
        actions.getPosts();
        actions.getAuthors();
    }, []);

    return (
        <div className="container bg-dark text-light mb-5" style={{minHeight: "790px"}}>
            <h2 className="mt-4 text-body-primary"> PUBLICACIONES </h2>
            <div className="pt-5 border-top">

                {store.postsList.length == 0 ?
                   <Spinner />
                    :
                    <div>
                        {store.postsList.map((post) =>
                            <PostCard key= {post.id} titulo={post.title} tags={post.tag} texto={post.text} idNumber={post.id} author={post.author_id}/>
                        )}
                    </div>
                }

            </div>
        </div>
    );
};
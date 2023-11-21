import React, {useContext, useEffect} from "react";
import { PostCard } from "../component/PostCard.jsx";
import { Context } from "../store/appContext.js";


export const PostList = () => {
    const {store, actions} = useContext(Context);

    useEffect(() => {
        actions.getPosts();
    }, []);

    return (
        <div className="container bg-dark text-light mb-5">
            <h2 className="mt-4 text-body-primary"> PUBLICACIONES </h2>
            <div className="pt-5 border-top">
            {store.postsList.map((post) =>     
                <PostCard titulo={post.title} tags={post.tag} texto={post.text}/>
           )}
            </div>
        </div>
    );
};
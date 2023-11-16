import React from "react";
import { PostCard } from "../component/PostCard.jsx";


export const PostList = () => {
    return (
        <div className="container bg-dark text-light mb-5">
            <h2 className="mt-4 text-body-primary"> PUBLICACIONES </h2>
            <div className="pt-5 border-top">
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </div>
    );
};
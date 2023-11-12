import React from "react";
//import pic from "../../img/edgar.png"
import { ProfileCard } from "../component/ProfileCard.jsx";
import { PostCard } from "../component/PostCard.jsx";
import { BioCard } from "../component/BioCard.jsx";

export const AuthorProfile = () => {
  return (
    <div className="container">
      <div className="row g-0 py-3">
        <div className="col-12 col-md-3">
          <ProfileCard />
        </div>
        <div className="col-12 col-md-9">
          <BioCard />
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
    </div>

  );
};
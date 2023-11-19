import React, {useContext} from "react";
//import pic from "../../img/edgar.png"
import { ProfileCard } from "../component/ProfileCard.jsx";
import { PostCard } from "../component/PostCard.jsx";
import { BioCard } from "../component/BioCard.jsx";
import { Context } from "../store/appContext.js";

export const AuthorProfile = () => {
  const {store, actions} = useContext(Context);

  return (
    <div className="container mb-5">
      <div className="row g-0 py-3">
        <div className="col-12 col-md-3">
          <ProfileCard alias={store.author.alias} birthday={store.author.birth_date} 
          city= {store.author.city} country={store.author.country} 
          quote= {store.author.quote}  />
        </div>
        <div className="col-12 col-md-9">
          <BioCard about= {store.author.about_me} />
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
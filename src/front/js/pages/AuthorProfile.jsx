import React, { useContext, useEffect } from "react";
//import pic from "../../img/edgar.png"
import { ProfileCard } from "../component/ProfileCard.jsx";
import { PostCard } from "../component/PostCard.jsx";
import { BioCard } from "../component/BioCard.jsx";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const AuthorProfile = () => {
  const navigate = useNavigate(); 

  const { store, actions } = useContext(Context);

 


  const elemento = store.selectedAuthor;

  if (store.isLogged) {
    return (
      <div className="container mb-5">
        <div className="row g-0 py-3">
          <div className="col-12 col-md-3"> 
          { (store.authorIdNumber == store.user.id) || store.authorIdNumber==0  ?
              <ProfileCard alias={store.author.alias} birthday={store.author.birth_date}
                city={store.author.city} country={store.author.country}
                quote={store.author.quote} /> 
                :
                <ProfileCard alias={elemento[0].alias} birthday={elemento[0].birth_date}
              city={elemento[0].city} country={elemento[0].country}
              quote={elemento[0].quote} />     
          }     
          </div>
          <div className="col-12 col-md-9">  
          { (store.authorIdNumber == store.user.id) || store.authorIdNumber==0  ?         
              <BioCard about={store.author.about_me} /> 
              :
              <BioCard about={elemento[0].about_me} />
            }             
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
  } else {
    return (
      <div className="container mb-5">
        <div className="row g-0 py-3">
          <div className="col-12 col-md-3">
            <ProfileCard alias={elemento[0].alias} birthday={elemento[0].birth_date}
              city={elemento[0].city} country={elemento[0].country}
              quote={elemento[0].quote} />

          </div>
          <div className="col-12 col-md-9">
            <BioCard about={elemento[0].about_me} />

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
    )
  }
};
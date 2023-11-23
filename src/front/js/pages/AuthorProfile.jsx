import React, { useContext, useEffect, useState } from "react";
//import pic from "../../img/edgar.png"
import { ProfileCard } from "../component/ProfileCard.jsx";
import { PostCard } from "../component/PostCard.jsx";
import { BioCard } from "../component/BioCard.jsx";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { Cover } from "../pages/Cover.jsx"
import { Spinner } from "../component/Spinner.jsx"

export const AuthorProfile = () => {
  const navigate = useNavigate();
  const [timeUp, setTimeUp] = useState(true)
  const timing = timeUp;

  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getPostsByAuthors();
    /*
    setTimeout(() => {
      setTimeUp(false)
    }, 1000)
    */

  }, []);


  const elemento = store.selectedAuthor;
  const publicacion = store.postsByAuthor;

  return (

    store.isLogged ?
      <div className="container mb-5" style={{minHeight: "790px"}}>
        <div className="row g-0 py-3">
          <div className="col-12 col-md-3">
            {(store.authorIdNumber == store.user.id) || store.authorIdNumber == 0 ?
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
            {(store.authorIdNumber == store.user.id) || store.authorIdNumber == 0 ?
              <BioCard about={store.author.about_me} />
              :
              <BioCard about={elemento[0].about_me} />
            }
            {store.postsByAuthor.length == 0 ?
              <Spinner />
              :
              <div>
                {store.postsByAuthor.map((post) =>
                  <PostCard key={post.id} titulo={post.title} tags={post.tag} texto={post.text} idNumber={post.id} />
                )}
              </div>
            }
          </div>
        </div>
      </div>
      :
      store.authorIdNumber != 0 ?
        <div className="container mb-5" style={{minHeight: "790px"}}>
          <div className="row g-0 py-3">

            <div className="col-12 col-md-3">
              <ProfileCard alias={elemento[0].alias} birthday={elemento[0].birth_date}
                city={elemento[0].city} country={elemento[0].country}
                quote={elemento[0].quote} />
            </div>

            <div className="col-12 col-md-9">
              <BioCard about={elemento[0].about_me} />
              {store.postsByAuthor.length == 0 ?
                <Spinner />
                :
                <div>
                  {store.postsByAuthor.map((post) =>
                    <PostCard key={post.id} titulo={post.title} tags={post.tag} texto={post.text} idNumber={post.id} author= {post.author_id}/>
                  )}
                </div>
              }
            </div>

          </div>
        </div>
        :
        <Cover />
  );
};
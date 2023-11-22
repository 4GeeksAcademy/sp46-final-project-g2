import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashnode } from "@fortawesome/free-brands-svg-icons";
import { faGlasses } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import pic from "../../img/sisifo.jpg"
import { Context } from "../store/appContext";

export const PostCard = (props) => {
  const { store, actions } = useContext(Context);
  const handleIdpost = () => {
    actions.setPostIdNumber(props.idNumber)
    actions.selectPost()
    actions.setAuthorIdNumber(store.selectedPost[0].author_id)
  }

  let authorP = []
  const [authorName, setAuthorName] = useState('')
  const [leidos, setLeidos] = useState(0)
  const [valoracion, setValoracion] = useState(0)

  useEffect(() => {    
    setTimeout(() => {
      if (store.authorsList.length > 0) {
        authorP = store.authorsList.filter((item) => item.id == props.author)      
        setAuthorName(authorP[0].alias)
      }
    }, "1000");
    /*
    if (store.authorsList.length > 0) {
      console.log (props.author)
      actions.setAuthorIdNumber(props.author)
      actions.selectAuthor();
      store.selectedAuthor
      if(store.selectedAuthor.length>0)console.log (store.selectedAuthor[0].alias)
      
      /*
      
      authorP = store.authorsList.filter((item) => item.id == props.author)      
      setAuthorName(authorP[0].alias)
      */
     /*
      actions.setPostIdNumber(props.idNumber)
      actions.selectPost()
      actions.setAuthorIdNumber(store.selectedPost[0].author_id)
    */
      setLeidos (Math.floor(Math.random() * 1000))
      setValoracion(Math.floor(Math.random() * 5)+1)
    
  }, [])



  return (
    <div className="card mb-2 mx-1" style={{ height: '218px' }}>
      <div className="row g-0">

        <div className="col-6 col-md-3 col-lg-2 col-xl-2 col-xxl-2 ">
          <div className="">
            <Link to="/post-view">
              <img src={pic} className="img-fluid rounded-start"
                alt="..." style={{ height: '217px', width: '155px' }} />
            </Link>
          </div>
        </div>

        <div className="col-6 col-md-9 col-lg-10 col-xl-10 col-xxl-10">
          <div className="card-body">
            <h5 className="card-title">
              <Link to="/post-view" onClick={handleIdpost}> {props.titulo} </Link>
            </h5>
            <h6 className="card-subtitle text-body-secondary fw-lighter mb-4">
              <FontAwesomeIcon className="me-2" icon={faHashnode} size="sm" />
              {props.tags} -
              {
                authorName == 0 ?
                  <span className="placeholder-glow">
                    <span className="placeholder" style={{ width: "25%" }} >
                    </span>
                  </span>
                  :
                  " " + authorName
              }
            </h6>
            <p className="card-text text-truncate">{props.texto}</p>
            <h6 className="card-subtitle fw-lighter mb-2"> <FontAwesomeIcon icon={faGlasses} size="sm" /> <span className="text-light"> {leidos} </span> veces leído </h6>
            <h6 className="card-subtitle fw-lighter mb-2"> <FontAwesomeIcon icon={faStar} size="sm" /><FontAwesomeIcon icon={faStar} size="sm" /><FontAwesomeIcon icon={faStar} size="sm" />
              <FontAwesomeIcon icon={faStar} size="sm" /><FontAwesomeIcon icon={faStarHalfStroke} size="sm" /> - {valoracion}
            </h6>
          </div>
        </div>

      </div>
    </div>
  );
};
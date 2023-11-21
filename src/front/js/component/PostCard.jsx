import React,  {useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashnode } from "@fortawesome/free-brands-svg-icons";
import { faGlasses } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import pic from "../../img/sisifo.jpg"
import { Context } from "../store/appContext";

export const PostCard = (props) => {
  const {store, actions} = useContext(Context); 

  const handleIdpost = () => {
    actions.setPostIdNumber(props.idNumber)
    actions.selectPost();
    console.log (props.idNumber)
  }

  useEffect(() => {
    actions.getPosts();
}, []);

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
            <h5 className="card-title pb-2">
              <Link to="/post-view" onClick={handleIdpost}> {props.titulo} </Link>
            </h5>
            <h6 className="card-subtitle mb-4 text-body-secondary fw-lighter">
              <FontAwesomeIcon className="me-2" icon={faHashnode} size="sm" />
              <Link to="#">{props.tags}</Link>
            </h6>
            <p className="card-text text-truncate">{props.texto}</p>
            <h6 className="card-subtitle fw-lighter mb-2"> <FontAwesomeIcon icon={faGlasses} size="sm" /> <span className="text-light"> 751 </span> veces leído </h6>
            <h6 className="card-subtitle fw-lighter mb-2"> <FontAwesomeIcon icon={faStar} size="sm" /><FontAwesomeIcon icon={faStar} size="sm" /><FontAwesomeIcon icon={faStar} size="sm" />
              <FontAwesomeIcon icon={faStar} size="sm" /><FontAwesomeIcon icon={faStarHalfStroke} size="sm" /> - 4,5
            </h6>
          </div>
        </div>

      </div>
    </div>
  );
};
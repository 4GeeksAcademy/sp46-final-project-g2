import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import pic from "../../img/edgar.png"
//import pic from "../../img/camus.jpeg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";


export const AuthorCard = (props) => {
  const {store, actions} = useContext(Context);
  const [seguidores, setSeguidores] = useState(0)
  const [escritos, setEscritos] = useState(0)
  const [valoracion, setValoracion] = useState(0)
  

  useEffect(()=> {
    setSeguidores (Math.floor(Math.random() * 1000)+1)
    setEscritos (Math.floor(Math.random() * 100)+1)
    setValoracion(((Math.random() * 4)+1).toFixed(1))
  }, [])


  const handleIdAuthor = () => {
    actions.setAuthorIdNumber(props.idNumber)
    actions.selectAuthor();
    console.log (props.idNumber)
  }
  
  return (
    <div className="card mb-2  mx-1" style={{ height:'218px' }}  >
      <div className="row g-0">

        <div className="col-6 col-md-3 col-lg-2 col-xl-2 col-xxl-2 ">
          <div className=" ">
            <Link to="/author-profile">
              <img src={pic} className="img-fluid rounded-start" 
              alt="..." style={{ height:'217px', width: '155px'  }}  />
            </Link>
          </div>
        </div>

        <div className="col-6 col-md-9 col-lg-10 col-xl-10 col-xxl-10">
          <div className="card-body">
            <Link to="/author-profile" onClick={handleIdAuthor}>
              <h5 className="card-title pb-2">{props.alias}</h5>
            </Link>
            <p className="card-text text-truncate pb-1"> {props.aboutMe} </p>
            <div className="">
              <h6 className="card-text text-body-secondary"><small className="text-body-secondary"> <FontAwesomeIcon icon={faBookOpenReader} />
                <span className="text-light"> {seguidores} </span> seguidores </small></h6>
              <h6 className="card-text text-body-secondary"> <small className="text-body-secondary"><FontAwesomeIcon icon={faAlignJustify} />
                <span className="text-light"> {escritos} </span> posts </small></h6>
              <h6 className="card-subtitle fw-lighter"> <small className="text-body-secondary"><FontAwesomeIcon icon={faStar} size="sm" />
                {/*
                <FontAwesomeIcon icon={faStar} size="sm" /><FontAwesomeIcon icon={faStar} size="sm" />
                <FontAwesomeIcon icon={faStar} size="sm" /><FontAwesomeIcon icon={faStarHalfStroke} size="sm" />
                */}
                 <span className="text-light border text-center px-2 mx-1 mt-2 py-0" >{valoracion}</span>
                 </small>
              </h6>
            </div>
          </div>          
        </div>

      </div>
    </div >

  );
};

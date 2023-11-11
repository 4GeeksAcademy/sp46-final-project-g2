import React from "react";
import pic from "../../img/edgar.png"


export const HorizontalCard = () => {
  return (
    <div className="card mb-3 w-100"  >
      <div className="row g-0">
        <div className="col-5 col-md-2 col-lg-2 col-xl-1 col-xxl-1 ">
        <div className="d-flex justify-content-center">
          <img src={pic} className="img-fluid rounded-start " alt="..."  />
          </div>
        </div>
        <div className="col-7 col-md-10 col-lg-10 col-xl-11 col-xxl-11">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>

  );
};

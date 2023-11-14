import React from "react";
import { Link } from "react-router-dom";
import pic from "../../img/mentoria.jpg"


export const ShoppingCartList = () => {
    return (
        <div className="mt-2">
        <ul className="list-group ">
            <li className="list-group-item d-flex justify-content-between align-items-start list-group-item-action">
                <div className="row mt-2">
                    <div className="col-3">
                        <img width={60} height={50} src={pic} className="" alt="..." style={{ maxWidth: '60px' }} />
                    </div>
                    <div className="col-7">
                        <div className="row">
                            <div className="fw-bold"> Reviews </div>
                            <div className="">Content for list item</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="col"> <small> 25,00 € </small> </div>
                    <div className="col"> <small> Eliminar </small> </div>
                </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start list-group-item-action">
            <div className="row mt-2">
                    <div className="col-3">
                        <img width={60} height={50} src={pic} className="" alt="..." style={{ maxWidth: '60px' }} />
                    </div>
                    <div className="col-7">
                        <div className="row">
                            <div className="fw-bold"> Mentorías </div>
                            <div className="">Content for list item</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="col"> <small> 25,00 € </small> </div>
                    <div className="col"> <small> Eliminar </small> </div>
                </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start list-group-item-action">
            <div className="row mt-2">
                    <div className="col-3">
                        <img width={60} height={50} src={pic} className="" alt="..." style={{ maxWidth: '60px' }} />
                    </div>
                    <div className="col-7">
                        <div className="row">
                            <div className="fw-bold"> PenToWrite </div>
                            <div className="">Content for list item</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="col"> <small> 25,00 € </small> </div>
                    <div className="col"> <small> Eliminar </small> </div>
                </div>
            </li>
        </ul>
        </div>
    );
};
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import pic from "../../img/camus.jpeg"
import { Context } from "../store/appContext";
import { Cover } from "./Cover.jsx";
//import { AuthorCard } from "../component/AuthorCard.jsx"


export const Membership = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        //console.log("los valores en member son", store.member)
        //store.isLogged;
    }, [])
    return (
        store.isLogged ?
        <div className="container mb-5" style={{ minHeight: '790px' }}>
            <h2 className="mt-4 text-body-primary"> SUSCRIPCION </h2>
            <div className="pt-5 border-top" ></div>
            <div className="px-3 py-2 my-2 border rounded">
                <div className="card mb-2  mx-1" style={{ minHeight: '218px' }}  >
                    <div className="row g-0">

                        <div className="col-12 col-md-3 col-lg-2 col-xl-2 col-xxl-2 ">
                            <div className=" " style={{ display: 'flex', justifyContent: 'center' }}>
                                <Link to="/author-profile">
                                    <img src={pic} className="img-fluid rounded-start"
                                        alt="..." style={{ height: '217px', width: '155px' }} />
                                </Link>
                            </div>
                        </div>

                        <div className="col-12 col-md-9 col-lg-10 col-xl-10 col-xxl-10">
                            <div className="card-body">

                                <h4 className="card-title pb-2">{store.author.alias}</h4>

                                <h5 className="card-text"> <span className="text-light"> Nombre: </span> {store.member.name} </h5>
                                <h5 className="card-text"> <span className="text-light"> NIF: </span>{store.member.nif} </h5>
                                <h5 className="card-text"> <span className="text-light"> Dirección </span> {store.member.address} </h5>
                                <div className="">
                                    <h5 className="card-text"><small className="text-body-secondary">
                                        <span className="text-light"> Suscripción válida hasta: </span> 31/12/2023 </small></h5>
                                </div>
                            </div>
                        </div>

                    </div>
                </div >

            </div>


            <div className="px-3 py-2 my-2 border rounded">
                <h3> OTROS SERVICIOS </h3>
                <div className="row px-3">
                    <div className="col-12 col-md-6 my-3 px-4" style={{ border: '2px solid black', borderRadius: '21px 21px 21px 21px' }}>
                        <div className="card mb-4 box-shadow" >
                            <h4 className="my-0 font-weight-normal  mx-auto">Review Unitaria</h4>
                        </div>
                        <div className="card-body text-center">
                            <h1 className="card-title pricing-card-title bg-primary w-25 mx-auto" style={{ fontSize: '20px', color: '' }}>11,95€</h1>
                            <Link to="/boton-pago">
                                <button type="button" className="btn btn-warning fw-bold text-dark mr-2 my-3">Comprar</button>
                            </Link>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 my-3" style={{ border: '2px solid black', borderRadius: '21px 21px 21px 21px' }}>
                        <div className="card mb-4 box-shadow" >
                            <h4 className="my-0 font-weight-normal  mx-auto">Taller completo</h4>
                        </div>
                        <div className="card-body text-center">
                            <h1 className="card-title pricing-card-title bg-primary w-25 mx-auto" style={{ fontSize: '20px', color: '' }}>359€</h1>
                            <Link to="/shopping-cart">
                                <button type="button" className="btn btn-warning fw-bold text-dark mr-2 my-3">Comprar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        :
        <Cover />

    );
};
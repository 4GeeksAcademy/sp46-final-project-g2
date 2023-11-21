import React from "react";



export const PostElement = (props) => {      
    return (
        <div>
            <div>
            <a className="d-flex flex-column flex-lg-row gap-3 align-items-start 
            align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" 
            href="#"/>
                <svg className="bd-placeholder-img" width="100%" height="96" 
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" 
                focusable="false">
                    <rect width="100%" height="100%" fill="#777"></rect>
                </svg>
                </div>
                <div className="col-lg-8">
                    <h6 className="mb-0">{props.titulo}</h6>
                    <small className="text-body-secondary">{props.fecha}</small>
                </div>
        </div>
    );
};
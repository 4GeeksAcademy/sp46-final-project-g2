import React from "react";
import { Jumbotron } from "../component/Jumbotron.jsx";
import { Jumbotron2 } from "../component/Jumbotron2.jsx";
import { RcircleCarousel } from "../component/RcircleCarousel.jsx";


export const Cover = () => {
    return (
        <div>
            <Jumbotron />
            <Jumbotron2 />  
            <RcircleCarousel />                   
        </div>
    );
};
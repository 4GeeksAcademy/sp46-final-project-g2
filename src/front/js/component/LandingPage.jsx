import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "./component/Jumbotron.jsx";
import { RcircleCarousel } from "./component/RcircleCarousel.jsx";
import { Jumbotron2 } from "./component/Jumbotron2.jsx";


export const LandingPage = () => {
    return (
        <div>
            <Jumbotron />
            <RcircleCarousel />
            <Jumbotron2 />
        </div>
    );
};
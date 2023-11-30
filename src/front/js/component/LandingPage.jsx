import React from "react";
import { Jumbotron } from "./Jumbotron.jsx";
import { RcircleCarousel } from "./RcircleCarousel.jsx";
import { Jumbotron2 } from "./Jumbotron2.jsx";


export const LandingPage = () => {
    return (
        <div>
            <Jumbotron />
            <RcircleCarousel />
            <Jumbotron2 />
        </div>
    );
};
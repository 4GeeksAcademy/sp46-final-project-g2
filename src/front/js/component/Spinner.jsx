import React from "react";

export const Spinner = () => {
    return (
        <div className="text-center " style={{ minHeight: "620px" }}>
            <div className="mt-5 pt-5">
                <div className=" spinner-grow text-warning mt-5 mx-1" role="status" style={{ height: "3rem", width: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className=" spinner-grow text-warning mt-5  mx-1" role="status" style={{ height: "3rem", width: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className=" spinner-grow text-warning mt-5  mx-1" role="status" style={{ height: "3rem", width: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}

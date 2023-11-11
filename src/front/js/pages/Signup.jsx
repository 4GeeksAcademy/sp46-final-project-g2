import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Signup = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="d-flex align-items-center justify-content-center">
            <form style={{ width: "400px" }}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input type="radio" className="form-check-input" id="author" name="userType" />
                        <label className="form-check-label" htmlFor="author">
                            Sign up as author
                        </label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" id="advisor" name="userType" />
                        <label className="form-check-label" htmlFor="advisor">
                            Sign up as advisor
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Sign up</button>
                </div>
            </form >
        </div >
    );
};
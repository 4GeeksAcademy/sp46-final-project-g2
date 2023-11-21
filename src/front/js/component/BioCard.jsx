import React, { useContext, useState } from "react";
import { BotonEditar } from "./BotonEditar.jsx";
import { BotonCancelar } from "./BotonCancelar.jsx";
import { Context } from "../store/appContext.js";


export const BioCard = (props) => {
    const { store, actions } = useContext(Context);
    const login = store.isLogged;
    
    const [editOn, setEditOn] = useState(false);
    const [cancelOn, setCancelOn] = useState(false);
    const [newAboutMe, setNewAboutMe] = useState(props.about);
    
    const handleEdit = () => {
        if (editOn) {
            actions.editAboutMe(newAboutMe)
            setCancelOn(false);
            setEditOn(false);
        } else {
            setEditOn(true);
            setCancelOn(true);
        }
    }

    const handleCancelar = () => {
        setEditOn(false);
        setCancelOn(false);
    }

    return (
        <div className="card mt-1 mb-3 mx-1" >
            <div className="card-body">
                <h5 className="card-title border-bottom">Acerca de mí</h5>
                {editOn ?
                    <div className="input-group input-group-sm mb-3">
                        <textarea type="text" className="form-control" placeholder="Acerca de mí..." 
                        aria-label="Acerca de mí" aria-describedby="basic-addon1" 
                        onChange={(e) => { setNewAboutMe(e.target.value) }} defaultValue={newAboutMe} 
                        />
                    </div> :
                    <p className="card-text py-4 px-4">{newAboutMe}</p>
                }
            </div>
            <div className="px-4" > {login && (store.authorIdNumber == store.author.id || store.authorIdNumber == 0)? 
                <div> 
                    <span onClick={handleEdit}> {<BotonEditar /> } </span> 
                    {cancelOn? <span onClick={handleCancelar}> {<BotonCancelar /> } </span>: <span/>}
                </div>: 
                <span/>} 
            </div>
        </div>
    );
};
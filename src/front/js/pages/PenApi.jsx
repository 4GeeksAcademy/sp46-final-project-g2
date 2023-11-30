import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from '../store/appContext';
import { Cover } from '../pages/Cover.jsx'


export const PenApi = () => {
    const { store, actions } = useContext(Context);
    const [selectedFile, setSelectedFile] = useState(null);
    const [convertedText, setConvertedText] = useState('');
    const navigate = useNavigate();
    let logged = false;

    useEffect(() => {
        logged = store.isLogged
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const url = 'https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/';
            const data = new FormData();
            data.append('srcImg', selectedFile);
            data.append('Session', 'string');
            const options = {
                method: 'POST',
                headers: {
                    'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
                    'X-RapidAPI-Host': 'pen-to-print-handwriting-ocr.p.rapidapi.com'
                },
                body: data
            };
            const response = await fetch(url, options);
            if (response.ok) {
                const data = await response.json()
                console.log("el value de data es", data.value);
                setConvertedText(data.value);
            } else {
                console.log('Error: ', response.status, response.statusText);
            }
        }
    };
    return (
        !store.isLogged ?
            <Cover /> :

            <div className="container mt-5" style={{ minHeight: "790px" }}>
                <h2 className="mt-4 text-body-primary"> PEN TO PRINT </h2>
                <div className="pt-5 border-top" ></div>
                
                <h2><small>Subir Imagen</small></h2>
                <div className="mb-3">
                    <input type="file" className="form-control" onChange={handleFileChange} />
                </div>
                <button className="btn btn-primary" onClick={handleUpload}>
                    Convertir
                </button>
                <div className="row">
                    <div className="col-12 col-md-6">
                        {selectedFile && (
                            <div className="mt-3">
                                <h4>Imagen Seleccionada:</h4>
                                <img src={URL.createObjectURL(selectedFile)} alt="Imagen Seleccionada" style={{ maxWidth: '300px', maxHeight: '500px' }} />
                            </div>
                        )}
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="" id="floatingTextarea" defaultValue={convertedText} style={{ minHeight: "450px" }}></textarea>
                            <label htmlFor="floatingTextarea" className="form-label">Texto editable</label>
                        </div>
                    </div>
                </div>
            </div>
    )

};

import React, { useState } from "react";

export const SignUpMember = () => {
    const [name, setName] = useState('');
    const [dni, setDni] = useState('');
    const [address, setAddress] = useState('');
    const [awards, setAwards] = useState('');

    const handleName = (event) => setName(event.target.value);
    const handleDni = (event) => setDni(event.target.value);
    const handleAddress = (event) => setAddress(event.target.value);
    const handleAwards = (event) => setAwards(event.target.value);

    const signupMember = async () => {
        const url = process.env.BACKEND_URL + '/api/members'; 
        const options = {
            method: 'POST',
            body: JSON.stringify({ name, dni, address, awards }), // Tenemos que enviar aquí el token?
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.log('Error: ', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{minHeight: '610px'}}>
            <form style={{ width: "400px" }}>
                <div className="form-group">
                    <label htmlFor="exampleInputName">Nombre y apellidos</label>
                    <input type="text" value={name} onChange={handleName} className="form-control" id="exampleInputName" aria-describedby="addressName" placeholder="Escribe aquí tu nombre y apellidos" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputNif">DNI</label>
                    <input type="text" value={dni} onChange={handleDni} className="form-control" id="exampleInputNif1" aria-describedby="nifHelp" placeholder="Escribe aquí tu DNI" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputAddress">Dirección</label>
                    <input type="text" value={address} onChange={handleAddress} className="form-control" id="exampleInputAddress" aria-describedby="addressHelp" placeholder="Escribe aquí tu dirección" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputAwards">Premios</label>
                    <input type="text" value={awards} onChange={handleAwards} className="form-control" id="exampleInputawards" aria-describedby="awardsHelp" placeholder="Indica aquí si tienes premios a tu nombre" />
                </div>
                <div className="mt-4">
                    <button type="submit" onClick={signupMember} className="btn btn-warning fw-bold text-dark">Inscribirse como Miembro</button>
                </div>
            </form >
        </div >
    );
};
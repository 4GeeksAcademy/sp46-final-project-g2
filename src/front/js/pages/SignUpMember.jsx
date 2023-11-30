import React, { useState } from "react";

export const SignUpMember = () => {
    const [name, setName] = useState('');
    const [nif, setNif] = useState('');
    const [address, setAddress] = useState('');

    const handleName = (event) => setName(event.target.value);
    const handleNif = (event) => setNif(event.target.value);
    const handleAddress = (event) => setAddress(event.target.value);

    const signupMember = async () => {
        const url = process.env.BACKEND_URL + '/api/members'; 
        const dataToSend = {
            "user": {},
            "author": {},
            "advisor": {}, 
            "member": {
                "name": name, 
                "nif": nif, 
                "address": address,
                "is_active": true,
                "status": "Active"
            }
        } 
        const options = {
            method: 'POST',
            body: JSON.stringify( dataToSend ), 
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log(dataToSend, options, url)
        /*  try { */
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setName('');
            setNif('');
            setAddress('');
        } else {
            console.log('Error: ', response.status, response.statusText);
        }
  /*   } catch (error) {
        console.error('Error:', error);
    } */
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{minHeight: '790px'}}>
            <form style={{ width: "400px" }}>
                <div className="form-group">
                    <label htmlFor="exampleInputName">Nombre y apellidos</label>
                    <input type="text" value={name} onChange={handleName} className="form-control" id="exampleInputName" aria-describedby="addressName" placeholder="Escribe aquí tu nombre y apellidos" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputNif">NIF</label>
                    <input type="text" value={nif} onChange={handleNif} className="form-control" id="exampleInputNif1" aria-describedby="nifHelp" placeholder="Escribe aquí tu NIF" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputAddress">Dirección</label>
                    <input type="text" value={address} onChange={handleAddress} className="form-control" id="exampleInputAddress" aria-describedby="addressHelp" placeholder="Escribe aquí tu dirección" />
                </div>
                <div className="mt-4">
                    <button type="button" onClick={signupMember} className="btn btn-warning fw-bold text-dark">Inscribirse como Miembro</button>
                </div>
            </form >
        </div >
    );
};
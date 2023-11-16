import React, { useState } from "react";

export const SignUpAdvisor = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nif, setNif] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    const handleNif = (event) => setNif(event.target.value);
    const handleAddress = (event) => setAddress(event.target.value);
    const handleCity = (event) => setCity(event.target.value);
    const handleCountry = (event) => setCountry(event.target.value);

    const signupAdvisor = async () => {
        const url = process.env.BACKEND_URL + '/api/signup'; 
        const options = {
            method: 'POST',
            body: JSON.stringify({ email, password, nif, address, city, country }),
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
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="email" value={email} onChange={handleEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Escribe el email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Contraseña</label>
                    <input type="password" value={password} onChange={handlePassword} className="form-control" id="exampleInputPassword1" placeholder="Escribe la contraseña" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputNif">NIF</label>
                    <input type="nif" value={nif} onChange={handleNif} className="form-control" id="exampleInputNif1" aria-describedby="nifHelp" placeholder="Escribe el NIF de tu empresa" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputAddress">Dirección</label>
                    <input type="address" value={address} onChange={handleAddress} className="form-control" id="exampleInputAddress" aria-describedby="addressHelp" placeholder="Escribe la dirección de tu empresa" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputCity">Ciudad</label>
                    <input type="city" value={city} onChange={handleCity}  className="form-control" id="exampleInputCity" aria-describedby="cityHelp" placeholder="Escribe la ciudad de tu empresa" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">País</label>
                    <input type="country" value={country} onChange={handleCountry}  className="form-control" id="exampleInputcountry" aria-describedby="countryHelp" placeholder="Escribe el país de tu empresa" />
                </div>
                <div className="mt-4">
                    <button type="submit" onClick={signupAdvisor} className="btn btn-warning fw-bold text-dark">Sign up</button>
                </div>
            </form >
        </div >
    );
};
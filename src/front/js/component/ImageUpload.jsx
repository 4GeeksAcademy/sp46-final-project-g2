import React, { useState } from 'react';

export const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const url = process.env.BACKEND_URL + '/upload';
      const options = {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'application/json' }
      };
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          console.log('URL de la imagen subida:', data.url);
        } else {
          const error = await response.json();
          console.error('Error al subir la imagen:', error.message);
        }
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2><small>Subir Imagen</small></h2>
      <div className="mb-3">
        <input type="file" className="form-control" onChange={handleFileChange} />
      </div>
      <button className="btn btn-primary" onClick={handleUpload}>
        Subir
      </button>
      {/* Puedes agregar más elementos para mostrar la imagen seleccionada si lo deseas */}
      {selectedFile && (
        <div className="mt-3">
          <h4>Imagen Seleccionada:</h4>
          <img src={URL.createObjectURL(selectedFile)} alt="Imagen Seleccionada" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
};
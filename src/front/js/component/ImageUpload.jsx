import React, { useState } from 'react';

export const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Aquí puedes realizar alguna acción con el archivo seleccionado, como subirlo a un servidor.
    // Por ejemplo, si necesitas enviarlo a un servidor, puedes usar fetch para realizar una solicitud POST.
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      // Luego puedes usar fetch para enviar el formData al servidor
      // Ejemplo usando fetch:
      /*
      fetch('URL_DEL_SERVIDOR', {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        // Manejo de la respuesta del servidor
      })
      .catch(error => {
        // Manejo de errores
      });
      */
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
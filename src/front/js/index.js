import React from "react";
import ReactDOM from "react-dom";
import "../styles/index.css";  // Include your index.scss file into the bundle
import Layout from "./Layout.jsx";  // Import your own components
import 'bootswatch/dist/slate/bootstrap.min.css'; // Importamos paleta de colores slate

// Render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));

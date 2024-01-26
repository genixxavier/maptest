import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App.tsx";
import { MapsApp } from "./MapsApp.tsx";

import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2VuaXh4YXZpZXIiLCJhIjoiY2t1czExaXY5MG5wZTJ3cTl6ZHF4a2I4biJ9._SxNhSFCv1-Ct_BFyashyw";

if (!navigator.geolocation) {
  alert("Geolocation is not supported by your browser");
  throw new Error("Geolocation is not supported by your browser");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);

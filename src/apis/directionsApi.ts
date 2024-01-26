import axios from 'axios';

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        steps: false,
        overview: 'simplified',
        access_token: 'pk.eyJ1IjoiZ2VuaXh4YXZpZXIiLCJhIjoiY2t1czExaXY5MG5wZTJ3cTl6ZHF4a2I4biJ9._SxNhSFCv1-Ct_BFyashyw',
        language: 'es',
    },
});

export default directionsApi;
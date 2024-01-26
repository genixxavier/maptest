import axios from 'axios';

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        access_token: 'pk.eyJ1IjoiZ2VuaXh4YXZpZXIiLCJhIjoiY2t1czExaXY5MG5wZTJ3cTl6ZHF4a2I4biJ9._SxNhSFCv1-Ct_BFyashyw',
        limit: 5,
        language: 'es',
    },
});

export default searchApi;
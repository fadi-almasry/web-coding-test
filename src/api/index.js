import axios from "axios";

export const clientID = '053154f56496429ea60132eda2c611ad'
export const clientSecret = 'e61ea189be5446068cd2803ed2ed3a53'

// Creating Authentication API...
const AUTHENTICATION_API = axios.create({ 
    baseURL: 'https://accounts.spotify.com', 
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer(clientID + ':' + clientSecret).toString('base64'))
    } 
})

// Creating Search API...
const SEARCH_API = axios.create({ 
    baseURL: 'https://api.spotify.com/v1/search', 
})

SEARCH_API.interceptors.request.use((req) => {
    const type = localStorage.getItem('token_type')
    const accessToken = localStorage.getItem('access_token')
    if (accessToken && type) {
        req.headers.Authorization = `${type} ${accessToken}`;
    }
    return req;
});


// Creating Albums API...
const ALBUMS_API = axios.create({ 
    baseURL: 'https://api.spotify.com/v1/artists', 
})

ALBUMS_API.interceptors.request.use((req) => {
    const type = localStorage.getItem('token_type')
    const accessToken = localStorage.getItem('access_token')
    if (accessToken && type) {
        req.headers.Authorization = `${type} ${accessToken}`;
    }
    return req;
});


// APIs...
export const requestAccessToken = (data) => AUTHENTICATION_API.post(`/api/token`, data)
export const searchArtists = (query) => SEARCH_API.get(`?q=${query}&type=artist`)
export const getAlbums = (id) =>  ALBUMS_API.get(`/${id}/albums`)
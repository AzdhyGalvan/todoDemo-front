/**
 * este archivo es para crear la instancia de axios para mandar nuestras peticiones
 */

import axios from "axios";

//constante para validar si mi aplicacion esta en produccion o esta en local
const isProduction = process.env.NODE_ENV === 'production';

//constante para validar si la app esta en produccion hara peticion a heroku
                                //procuccion                                    //local develop
const baseURL = isProduction ? 'https://tinder-perritas.herokuapp.com/api' : 'http://localhost:5005/api'

export const api = axios.create({
    baseURL,
    withCredentials:true,
    timeout:10000
})

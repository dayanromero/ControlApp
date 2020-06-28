import axios from 'axios';

const URL = 'https://zestian-map-finder.herokuapp.com'
const URL_GOV_DATA = 'https://www.datos.gov.co/resource/gt2j-8ykr.json?'
const GET_USER = '/user/id/'
const GET_LOCATIONS = '/location/all'
const GET_ACTIVITY = '/event/find?userId='
const CREATE_ACTIVITY = '/event/create/'
const CREATE_USER = '/user/create/'
const EDIT_USER = '/user/update/'
const CREATE_ZONE = '/location/create/'
const GET_ZONE = '/location/all'
const DELETE_ZONE = '/location/delete/'

const queries = {
    totalHMR: '$order=total DESC&$select=atenci_n as type, COUNT(*) as total&$group=atenci_n&$where=atenci_n in("Casa", "Fallecido", "Hospital", "Hospital UCI", "Recuperado")',
    total: '$order=total DESC&$select=COUNT(*) as total'
}

const instance = axios.create({
    baseURL: URL,
  });

export const fetchUser = (id) => {
    return instance.get(`${GET_USER}${id}`)
    .then(Response =>  Response.data)
}

export const fetchActivity = (userid) => {
    return instance.get(`${GET_ACTIVITY}${userid}`)
    .then(Response =>  Response.data)
}

export const fetchLocation = () => {
    return instance.get(`${GET_LOCATIONS}`)
    .then(Response =>  Response.data)
}

export const createActivity = (data) => {
    return instance.post(`${CREATE_ACTIVITY}`, data)
    .then(Response =>  Response.data)
}

export const createUser = (data) => {
    return instance.post(`${CREATE_USER}`, data)
    .then(Response =>  Response.data)
}

export const updateUser = (id, values) => {
    return instance.put(`${EDIT_USER}${id}`, values)
    .then(Response =>  Response.data)
}

export const createZone = (data) => {
    return instance.post(`${CREATE_ZONE}`, data)
    .then(Response =>  Response.data)
}

export const getZones = () => {
    return instance.get(`${GET_ZONE}`)
    .then(Response =>  Response.data)
}

export const deleteZones = (id) => {
    return instance.delete(`${DELETE_ZONE}${id}`)
    .then(Response =>  Response.data)
}

export const fetTotal = () => {
    return instance.get(`${URL_GOV_DATA}${queries.total}`)
    .then(Response =>  Response.data)
}

export const fetHosMuerec = () => {
    return instance.get(`${URL_GOV_DATA}${queries.totalHMR}`)
    .then(Response =>  Response.data)
}
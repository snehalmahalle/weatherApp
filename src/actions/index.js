import {  UPDATE_CITIES_LIST,GET_CITY_DETAILS,
    GET_CITY_DETAILS_FAIL,
    GET_CITY_DETAILS_SUCCESS } from '../constants/index';

export function updateCitylist(cities) {
    return {
    type: UPDATE_CITIES_LIST,
    payload: cities
    }
}
export function getCityDetails(details) {
    return {
    type: GET_CITY_DETAILS,
    payload: details
    }
}
export function getCityDetailsSuccess(payload) {
    return {
    type: GET_CITY_DETAILS_SUCCESS,
    payload: payload
    }
}
export function getCityDetailsFail(error) {
    return {
    type: GET_CITY_DETAILS_FAIL,
    payload: error
    }
}
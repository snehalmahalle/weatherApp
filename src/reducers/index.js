import { round } from 'lodash';
import {UPDATE_CITIES_LIST,
    GET_CITY_DETAILS,
    GET_CITY_DETAILS_FAIL,
    GET_CITY_DETAILS_SUCCESS } from '../constants/index';
const initialState = {
citiesList:[],
error:null
};
const citiesReducer = (state = initialState, action) => {
    switch(action.type) {
    
        case UPDATE_CITIES_LIST:
        return {
            ...state,
            citiesList:action.payload
        };
        case GET_CITY_DETAILS:
        return {
            ...state,
            cityName:action.payload,error:null
        };
        case GET_CITY_DETAILS_SUCCESS:
            function fardToDegree(T){
                return round((T - 32) / 1.8)
            }
            let response=action.payload
                let data={
                  cityName:  response.name ,
                  country: response.sys.country,
                  sunriseTime:response.sys.sunrise,
                  sunsetTime: response.sys.sunset,
                  weatherDes:response.weather[0].description,
                  weatherIcon:response.weather[0].icon,
                  temp: fardToDegree(response.main.temp), 
                temp_max:fardToDegree(response.main.temp_max) ,
                temp_min: fardToDegree(response.main.temp_min),

                }
        return {
            ...state,
            cityDetails:data,error:null
        };
        case GET_CITY_DETAILS_FAIL:
            return {
                ...state,
                error:action.payload
            };
        default:
        return state;
    }
}
export default citiesReducer;
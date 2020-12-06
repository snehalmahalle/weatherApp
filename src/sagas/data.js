
import "regenerator-runtime/runtime";
import {
    put,
    all,
    call,
    takeEvery,select
} from "redux-saga/effects";
import axios from "axios";
import { getCityDetailsFail, getCityDetailsSuccess } from "../actions";

export const cityName = (state) => state.cities.cityName;

const getDetailsFromApi = async (model) => {
   
    const request = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${model}&appid=28e73b144c2fe1904c036a7253722736`);
    return request;
};

function* getCityDetails() {
    let model = yield select(cityName);
    try {
        if(model){
            try{
               
                const response = yield call(getDetailsFromApi,model);
                console.log('response',response)
                yield put(getCityDetailsSuccess(response.data));
            }
            catch(error){
                yield put(getCityDetailsFail(error.response.data));
            }
        }

    } catch (error) {

        yield put(getCityDetailsFail('onother error'));
    }
}


export const  dataSagas = [
    takeEvery("GET_CITY_DETAILS", getCityDetails),
    
]


export default function* rootSaga () {
    yield all([
        ...dataSagas,
      ]);
}


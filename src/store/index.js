import { createStore, combineReducers,applyMiddleware  } from 'redux';
import createSagaMiddleware from 'redux-saga';
import citiesReducer from '../reducers/index';
import rootSaga  from '../sagas/index';
import "regenerator-runtime/runtime";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers(
    { cities: citiesReducer }
);
const configureStore = () => {
    let store= createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
}
export default configureStore;
/**
 * Root Sagas
 */
import { all } from "redux-saga/effects";

// sagas
import dataSagas from "./data";


export default function* rootSaga() {
    yield all([
        dataSagas(),
    ]);
  }


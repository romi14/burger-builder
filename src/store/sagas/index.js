import {logoutSaga,checkAuthTimeoutSaga,authUserSaga, authCheckStateSaga} from './auth';
import {initIngredientsSaga} from './burgerBuilder';
import {takeEvery,all,takeLatest} from 'redux-saga/effects';//takeEvery allows us to listen to certain actions and do something when they occur
import * as actionTypes from '../actions/actionTypes';
import {fetchOrdersSaga, purchaseBurgerSaga} from './order';

export function* watchAuth(){//setting this generator would simply mean that from now on it will listen to actions mentioned inside it
    // yield takeEvery(actionTypes.AUTH_USER,authUserSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeoutSaga);//This should come first in sequence by logic
    // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT,logoutSaga);//logoutSaga will be called(not executed) when AUTH_INITIATE_LOGOUT occurs
    // //yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeoutSaga);
    // yield takeEvery(actionTypes.AUTH_CHECK_STATE,authCheckStateSaga); 
    yield all([//all is as expected and useful
        takeEvery(actionTypes.AUTH_USER,authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeoutSaga),//This should come first in sequence by logic
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT,logoutSaga),//logoutSaga will be called(not executed) when AUTH_INITIATE_LOGOUT occurs
        takeEvery(actionTypes.AUTH_CHECK_STATE,authCheckStateSaga) 
    ])
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.INIT_INGREDIENTS,initIngredientsSaga); 
}

export function* watchOrder(){
    yield takeLatest(actionTypes.PURCHASE_BURGER,purchaseBurgerSaga);//takeLatest will automatically cancel any ongoing executions of purchaseBurgerSaga and only execute the latest one
    yield takeEvery(actionTypes.FETCH_ORDERS,fetchOrdersSaga);

}
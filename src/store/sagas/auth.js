//The * converts the function into a generator
//These are nextJS features which are functions which can be executed incrementally
//We can call them but they don't run from start to end immediately but we can pause
//during function execution eg. to wait for async code to finish..exactly what
//redux saga takes advantage of..if we have only sync code..we can execute them
//from start to end immediately
//Once our saga is connected to store, it can dispatch any action of any reducer through put function
//the yield keyword is not connected to redux-saga but is a nextGenJS feature connected to the generator concept
import {put,call} from 'redux-saga/effects';//call allows us to call some function on some object
//import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';
import {delay} from 'redux-saga/effects';
import axios from 'axios';

export function* logoutSaga(action) {
    //call is making out code bigger so why use it..because it makes our generators testable..we can mock this and not really execute our code whereas otherwise we have to execute it
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expirationDate');
    yield call([localStorage, 'removeItem'], 'userId'); 
    // yield localStorage.removeItem('token');//In a generator we have to prefix each step we execute with yield keyword
    // yield localStorage.removeItem('expirationDate');//It means that this step should be executed and it will wait for it to finish
    // yield localStorage.removeItem('userId');//Even for an async step, flow will not continue before it's done
    yield put(/* {
        type : actionTypes.AUTH_LOGOUT /Commented because just like action creators should not have side effects, they must be handled by Sagas...changing actual state must not be handled by Sagas, they are the responsibility of action creators/
    } */ actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime*1000);//just like I said flow will not continue before statement is fully executed
    yield put(actions.logout());
    // setTimeout(function(){
    //         dispatch(logout());        
    // },expirationTime*1000);
}

export function* authUserSaga(action){
    yield put(actions.authStart());
        const authData = {
            email : action.email,//server of firebase has it's own checks of email and password
            password : action.password,
            returnSecureToken : true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZ2oM_xw9EYoHEnwJojI1ypHJ9hVlh86Y';
        if(!action.isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZ2oM_xw9EYoHEnwJojI1ypHJ9hVlh86Y';
        }
        try{
            const response = yield axios.post(url,authData);
                        //Due to yield, this will not return a promise anymore..but wait for the promise to be resolved and then store whatever we get back in response constant
                        //So, we don't need the 'then' or 'catch' methods anymore
             /* .then(response => {
                // console.log(response);
                 const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                 localStorage.setItem('token',response.data.idToken);
                 localStorage.setItem('expirationDate',expirationDate);
                 localStorage.setItem('userId',response.data.localId);
                 dispatch(authSuccess(response.data.idToken,response.data.localId));
                 dispatch(checkAuthTimeout(response.data.expiresIn))
             })
             .catch(err => {
                 //console.log(err);
                 dispatch(authFail(err.response.data.error));
             }) */

                 const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                 yield localStorage.setItem('token',response.data.idToken);
                 localStorage.setItem('expirationDate',expirationDate);//yield is optional for synchronous actions
                 yield localStorage.setItem('userId',response.data.localId);
                 yield put(actions.authSuccess(response.data.idToken,response.data.localId));
                 yield put(actions.checkAuthTimeout(response.data.expiresIn));
            }//end of try block
            catch(error){
                yield put (actions.authFail(error.response.data.error));
            }
}

export function* authCheckStateSaga(action){
        const token = yield localStorage.getItem('token');
        if(!token){
            yield put(actions.logout());
        }
        else{
            const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){
                const userId = yield localStorage.getItem('userId');
                yield put(actions.authSuccess(token,userId));
                yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
            else{
                yield put(actions.logout());
            }
        }
}
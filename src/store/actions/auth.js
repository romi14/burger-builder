import * as actionTypes from './actionTypes';
//import axios from 'axios';
import { updateObject } from '../../Shared/utility';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error : error
    }
}
export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return{
        //type : actionTypes.AUTH_LOGOUT
        type : actionTypes.AUTH_INITIATE_LOGOUT
    }    
}

export const logoutSucceed = () => {
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {//This method will kill the dispatch through which it's called and dispatch something itself(nested dispatch killing)
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime:expirationTime
    }
        /* dispatch => {
        setTimeout(function(){
            dispatch(logout());        
        },expirationTime*1000);
    } */
}

export const auth = (email,pass,isSignup) => {
    // return dispatch => {
    //     dispatch(authStart());
    //     const authData = {
    //         email : email,//server of firebase has it's own checks of email and password
    //         password : pass,
    //         returnSecureToken : true
    //     }
    //     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZ2oM_xw9EYoHEnwJojI1ypHJ9hVlh86Y';
    //     if(!isSignup){
    //         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZ2oM_xw9EYoHEnwJojI1ypHJ9hVlh86Y';
    //     }
    //     axios.post(url,authData)
    //          .then(response => {
    //             // console.log(response);
    //              const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    //              localStorage.setItem('token',response.data.idToken);
    //              localStorage.setItem('expirationDate',expirationDate);
    //              localStorage.setItem('userId',response.data.localId);
    //              dispatch(authSuccess(response.data.idToken,response.data.localId));
    //              dispatch(checkAuthTimeout(response.data.expiresIn))
    //          })
    //          .catch(err => {
    //              //console.log(err);
    //              dispatch(authFail(err.response.data.error));
    //          })
    // }
    return {
        type: actionTypes.AUTH_USER,
        email:email,
        password:pass,
        isSignup:isSignup
    }
}

export const setAuthRedirectPath = (path) => {
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState = () => {
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if(!token){
    //         dispatch(logout());
    //     }
    //     else{
    //         const expirationDate = new Date(localStorage.getItem('expirationDate'));
    //         if(expirationDate > new Date()){
    //             const userId = localStorage.getItem('userId');
    //             dispatch(authSuccess(token,userId));
    //             dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
    //         }
    //         else{
    //             dispatch(logout());
    //         }
    //     }
    // }
    return{
        type:actionTypes.AUTH_CHECK_STATE
    }
}
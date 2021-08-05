import React from 'react';
import * as actions from '../actions/index';
import axios from '../../axios-orders';
import {put} from 'redux-saga/effects';
export function* initIngredientsSaga(action){
    try{
    const response = yield axios.get('/ingredients.json');
             /* .then(response => {
                 dispatch(setIngredients(response.data));
                }
             )
             .catch(error => {
                //this.setState({error:true});
                dispatch(fetchIngredientsFailed());
             }); */
    
    yield put(actions.setIngredients(response.data));
    }
    catch(error){
        yield put(actions.fetchIngredientsFailed());
    }
}
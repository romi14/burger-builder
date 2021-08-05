import * as actionTypes from './actionTypes';
//import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredients = (ingredients) => {
  return{
      type: actionTypes.SET_INGREDIENTS,
      ingredients: ingredients 
  }  
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    // return dispatch => {
    //     axios.get('/ingredients.json')
    //          .then(response => {
    //              dispatch(setIngredients(response.data));

    //             //  const sum = Object.keys(response.data).map(
    //             //     igKey => {
    //             //         return response.data[igKey];
    //             //     }
    //             //     )//At this point, before reduce..sum is an array of values(of the ingredients)
    //             //     .reduce((sum,el) => {
    //             //         return sum+el;//el are the new values which are added
    //             //     },0);//sum is 0 initially(starting number)
            
    //             //     this.setState({purchasable:sum>0});
    //             }
    //          )
    //          .catch(error => {
    //             //this.setState({error:true});
    //             dispatch(fetchIngredientsFailed());
    //          });
    return{
        type:actionTypes.INIT_INGREDIENTS
    }   
  
};
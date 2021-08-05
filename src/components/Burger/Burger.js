import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {withRouter} from 'react-router-dom';

const burger = (props) => { 
    //method to transform an object with key-value pairs into an array of our jsx elements
    let transformedIngredients = Object.keys(props.ingredients)   //Object is a default js object's object, keys method simply extracts the keys of a js object and returns an array of those keys('salad' etc)..this new array has no info of the values of the keys
    .map(igKey => { //igKey is a key returned by keys method for every attribute in ingredients object(in our case, it's the string 'salad','cheese' etc)
        return [...Array(props.ingredients[igKey])] //Array is a js method that can create a new array..e.g->Array(3) will give an array with 3 empty spaces(or any undefined value), therefore 'props.ingredients[igKey]' is only defining length and nohting else
            .map((_,i) => (  //We used underscore because we don't care what values the array contains but only the length of array matters to us, i refers to the index of the element
            <BurgerIngredient key={igKey+i} type={igKey}/>  //igKey+i example 'salad'+1 will make a unique key
        ));
    })  //At this point of time(before reduce is executed), transformedIngredients contains 4 arrays(containing jsx code as elements or empty)
        //So we cannot get the length of transformedIngredients and it also becomes a big object, here reduce helps us by converting our array of multiple arrays into a normal array with only normal elements inside (jsx elements in out case)
        //reduce method helps us by taking all elements from inside the inner arrays and clubbing them together in the main array while removing the inner arrays
    .reduce(    //it's a js array function which helps to transform an array into someting else entirely
        (arr,el) => { //it takes 2 parameters which are passed by js automatically..the previous and the current values resp.
            //this callback is performed on every element in the array(elements are the 4 inner arrays in this case)
            return arr.concat(el);  
        },[]    //reduce function also takes the initial value as an array, since it is empty we have nothing in the beginning and our arr is empty(for every inner array)
    );

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    //console.log(transformedIngredients);
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default withRouter(burger);//withRouter gives the match, history etc props to the burger component
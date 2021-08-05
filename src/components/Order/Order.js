import React,{Component} from 'react';
import classes from './Order.module.css';

const order = (props) => {
    //Conversion from JS object to Array and vice versa are important concepts 
    //Array is mainly used along with it's map and push functions for logic implementation
    //map is used for getting data out of array and push for the reverse
    //JS objects are mainly used with 'for' loop and key-value pairs
    //'for' loop will extract data from them and data must be inserted in the form of key-value pairs         
    let ingredients = [];
    for(let key in props.ingredients){
        ingredients.push({name:key,amount:props.ingredients[key]});
    }

    const ingredientOutput = ingredients.map(ig => (
        <span 
              style = {{
                  textTransform:'capitalize',
                  display:'inline-block',
                  margin:'0 8px',
                  border:'1px solid grey',
                  padding:'5px'
              }}
              key={ig.name}>{ig.name}({ig.amount})</span>
    ))

    return(
        <div className={classes.Order}>
            Ingredients : {ingredientOutput}
            <p> Price : <strong>USD {props.price.toFixed(2)}</strong> </p>
        </div>
    )
}
export default order;
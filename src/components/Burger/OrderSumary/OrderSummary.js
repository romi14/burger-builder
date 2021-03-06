import React,{Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    componentWillUpdate(){
        //console.log('Order Summary will update');
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(
            key => {
                return <li key={key}>
                          <span style={{textTransform: 'capitalize'}}>{key}</span> : {this.props.ingredients[key]}
                       </li>
            }
        )
        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total price of your burger is {this.props.price.toFixed(2)}</p>
            <p>Continue to Checkout</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </Aux>
        )
    }
}

export default OrderSummary;
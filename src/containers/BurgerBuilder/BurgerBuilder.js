import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSumary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';//index automatically picked up
//import * as actions from '../../store/actions/index';//even if we would have not specified '/index'..react would have automatically picked it due it's name

// const INGREDIENT_PRICES = {
//     salad : 0.5,
//     cheese : 0.4,
//     meat : 1.3,
//     bacon : 0.6
// }
export class BurgerBuilder extends Component{

    state={
        /*ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },*/
        //ingredients:null,//definitely redux will help
        //totalPrice:4,//definitely redux will help
        //purchasable:false,//not local but still a UI state(redux not a necessity)
        purchasing:false,//local UI state
        //loading:false,//local UI state   //not managing this state now because we have applied asynchronous code 
        //error:false//local UI state      //it was local once..now since we are initializing ingredients in an action creator..redux has to be used
    }

    componentDidMount() {
        this.props.onInitIngredients();
        // axios.get('/ingredients.json')
        //      .then(response => {
        //          this.setState({ingredients:response.data});
        //          const sum = Object.keys(response.data).map(
        //             igKey => {
        //                 return response.data[igKey];
        //             }
        //             )//At this point, before reduce..sum is an array of values(of the ingredients)
        //             .reduce((sum,el) => {
        //                 return sum+el;//el are the new values which are added
        //             },0);//sum is 0 initially(starting number)
            
        //             this.setState({purchasable:sum>0});
        //         }
        //      )
        //      .catch(error => {
        //          this.setState({error:true});
        //      });
    }

    updatePurchaseState = (ingredients) => {
        /*const ingredients = {         //This was working fine till the ingredients we took from state were same as the updated ingredients..but it's not always the case
            ...this.state.ingredients
        };*/
        //method to get the sum of values possessed by an object
        //first form an array of keys
        //then an array of values possessed by those keys
        //finally reduce this array to get the sum
        //reduce method acc. to me is like a loop that sums the values of an array
        //if there are inner arrays, then it sums them to form just one array with all the inner array elements
        //using reduce twice (in inner array condition) will also result in just one sum
        const sum = Object.keys(ingredients).map(
            igKey => {
                return ingredients[igKey];
            }
        )//At this point, before reduce..sum is an array of values(of the ingredients)
        .reduce((sum,el) => {
            return sum+el;//el are the new values which are added
        },0);//sum is 0 initially(starting number)

        //this.setState({purchasable:sum>0});
        return sum>0;
    }

    /*addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        if(updatedCount>=0){
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceSubtraction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceSubtraction;

            this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
            this.updatePurchaseState(updatedIngredients);
        }
        

    }*/

    /**     We cannot do it through this way because this keyword will not belong to this class anymore
     *      Normal functions don't contain the state or context of the class but arrow functions do
     purchaseHandler(){
        this.setState({purchasing:true});
    }
     */
    purchaseHandler = () => {
        if(this.props.isAuthenticated)
            this.setState({purchasing:true});
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => { 
        //alert("You can continue!!");
        // this.setState({loading:true});
        // const order = {
        //     ingredients : this.state.ingredients,
        //     price : this.state.totalPrice,//just in demo..in real time we must re-calculate the price on server
        //     customer : {//dummy data
        //         name : 'Romi Kalra',
        //         address : {
        //             street : 'westend street',
        //             zipCode : '2500',
        //             country : 'India'
        //         },
        //         email : 'romi@yahoo.com'
        //     },
        //     deliveryMethod : 'fastest'//dummy data
        // }
        // axios.post('/orders.json',order)//.json is to be added for firebase to work correctly
        //      .then(response => {
        //          console.log(response);
        //          this.setState({loading:false,purchasing:false});
        //      }).catch(error => {
        //          console.log(error);
        //          this.setState({loading:false,purchasing:false});
        //      });
        // const queryParams = [];
        // for(let i in this.props.prc){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // } //encodeURIComponent -> whatever comes just convert it into string
        // queryParams.push('price=' + this.props.prc);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname : '/checkout',
        //     search : '?' + queryString

        // });
        this.props.onInitPurchase();
        this.props.history.push('./checkout');
    }
    render(){

        const disabledInfo = {
            //...this.state.ingredients
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        let orderSummary = null;
                
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if(this.props.ings){
            burger = (
                            <Aux>
                                <Burger ingredients={this.props.ings}/>
                                <BuildControls 
                                //ingredientAdded = {this.addIngredientHandler}
                                //ingredientRemoved = {this.removeIngredientHandler}
                                ingredientAdded = {this.props.onIngredientAdded}
                                ingredientRemoved = {this.props.onIngredientRemoved}
                                disabled={disabledInfo}
                                isAuth={this.props.isAuthenticated}
                                price={this.props.prc}
                                purchasable={this.updatePurchaseState(this.props.ings)}//added parenthesis because we want to execute it cause we are returning a boolean using it
                                ordered={this.purchaseHandler}/>
                            </Aux>
                        );
            orderSummary = <OrderSummary ingredients={this.props.ings}
                                         purchaseCanceled={this.purchaseCancelHandler}
                                         purchaseContinued={this.purchaseContinueHandler}
                                         price={this.props.prc}/>;
        }

        // if(this.state.loading || !this.props.ings){
        //     orderSummary = <Spinner />;
        // }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux> 
        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        prc : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
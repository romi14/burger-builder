import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject,checkValidity} from '../../../Shared/utility';

class ContactData extends Component {
    state ={
        formIsValid:false,
        //loading : false,
        orderForm:{ 
                name : {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                street : {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zipCode :{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: '',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false,
                    touched:false
                },
                country :{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },  
                email : {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-Mail'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },                
                deliveryMethod : {
                    elementType: 'select',
                    elementConfig: {
                        options:[
                            {value:'fastest',displayValue:'Fastest'},
                            {value:'cheapest',displayValue:'Cheapest'},
                        ]
                    },
                    value: 'fastest',
                    valid:true
                } 
            }
        
    }

    orderHandler = (event) => {
        event.preventDefault();//This will stop page from reloading

        //this.setState({loading:true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients : this.props.ings,
            price : this.props.prc,//just in demo..in real time we must re-calculate the price on server
            /*customer : {//dummy data
                name : 'Romi Kalra',
                address : {
                    street : 'westend street',
                    zipCode : '2500',
                    country : 'India'
                },
                email : 'romi@yahoo.com'
            },
            deliveryMethod : 'fastest'//dummy data
            */
           orderData : formData,
           userId : this.props.userId
        }
        /* axios.post('/orders.json',order)//.json is to be added for firebase to work correctly
             .then(response => {
                 console.log(response);
                 this.setState({loading:false});
                 this.props.history.push('/');
             }).catch(error => {
                 console.log(error);
                 this.setState({loading:false});
             }); */

             this.props.onOrderBurger(order,this.props.token);
    }

    inputChangedHandler = (event,inputIdentifier) => {
        //console.log(event.target.value);
        // const updatedOrderForm = {    //This will not deep clone the inside of inner objects
        //     ...this.state.orderForm
        // }
        /*const updatedFormElement = {    //This will deep clone all except elementConfig object
            ...updatedOrderForm[inputIdentifier]
        }*/
        
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
            value : event.target.value,
            valid : checkValidity(event.target.value,this.state.orderForm[inputIdentifier].validation),
            touched : true
        });

        const updatedOrderForm = updateObject(this.state.orderForm,{
            [inputIdentifier] : updatedFormElement
        });
        // updatedFormElement.value = event.target.value;
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        // updatedFormElement.touched = true;
        //console.log(updatedFormElement);
        //updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;//Anyone makes formIsValid false, it will remain false
        }

        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
    }

    // checkValidity(value,rules){
    //     let isValid = true;
    //     if(!rules){//For deliveryMethod...cause undefined.required as will happen in below condition will lead to an error
    //         return true;
    //     }
    //     if(rules.required){
    //         isValid = value.trim() !== '';
    //     }

    //     if(rules.minLength){
    //         isValid = value.length >= rules.minLength && isValid;//If isValid gets false in any condition then it will stay false no matter what
    //     }

    //     if(rules.maxLength){
    //         isValid = value.length <= rules.maxLength && isValid;
    //     }
        
    //     return isValid;
    // }

    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }

        const formElements = formElementArray.map(formElement => (
            <Input key={formElement.id}
                   elementType={formElement.config.elementType} 
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   invalid={!formElement.config.valid}
                   touched = {formElement.config.touched}
                   shouldValidate={formElement.config.validation}
                   changed={(event) => this.inputChangedHandler(event,formElement.id)}/>
        ));

        let form = (
                    <form onSubmit={this.orderHandler}>
                        {formElements}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                    </form>
                   );
        if(this.props.loading){
            form = <Spinner />;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        prc : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token: state.auth.token,
        userId : state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger :(orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
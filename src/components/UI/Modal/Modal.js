//A modal is a message box that is displayed on the top of your screen--from google
import React,{Component} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
         //return nextProps.show!==this.props.show;//This will make sure that order summary is not unnessarily re-rendered
         return nextProps.show!==this.props.show || this.props.children !== nextProps.children;//Fine tuning for showing spinner, children change when spinner comes into play
    }//Using just to make performance of application better
    //We could have used pure component to run all the checks rather than just on 'show' prop but that would make performance even worse

    componentWillUpdate(){
       // console.log('[Modal] will update');
    }
    render(){

        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                    style={{
                        transform:this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
         ) } 
    
}

export default Modal;
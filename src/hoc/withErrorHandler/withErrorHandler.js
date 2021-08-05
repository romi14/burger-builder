import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component{//Complex syntax for wrappers like this one
        state = {
            error : null
        }
        
        //componentDidMount(){
        //Handling interceptors in componentDidMount works awesome for the post requests
        //since they were able to execute before them but for the get request as in burgerBuilder's componentDidMount
        //if error comes in that request, no interceptors were defined before that..so error handling would not be possible
        //componentWillMount works in this case but constructors can also serve the purpose

        componentWillMount(){//componentWillMount is not preferred here because withErrorHandler in an HOC and every time we wrap a component around it..it will be called
            this.reqInterceptor = axios.interceptors.request.use(req => {//if we use the same axios instance in the wrapped components..we will in turn be creating multiple interceptors for the same instance
                this.setState({error:null});//This will further affect routing, so to comprehend with the situation, we'll use componentWillUnmount
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res,error => {//Shortest possible syntax for returning response
                this.setState({error:error});
                return error;
            });
        }

        componentWillUnmount(){
            //console.log('will unmount',this.reqInterceptor,this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        
        errorConfirmedHandler = () => {
            this.setState({error:null});
        }

        render(){
            
            return(
                <Aux>
                    <Modal show={this.state.error}
                           modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    } 
}

export default withErrorHandler;
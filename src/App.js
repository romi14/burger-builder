import React,{Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
//import Checkout from './containers/Checkout/Checkout';
import {Route, Switch,withRouter,Redirect} from 'react-router-dom'; 
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
//We could have made the App component as the layout too, would have been perfectly fine

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

class App extends Component {

  /*state = { //Just checking componentWillUnmount working insisde withErrorHandler
    show : true
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({show:false});
    },5000);
  }*/

  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render(){
    
    let routes = (
          <Switch>
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />{/**If no route is found it will redirect to home(in case user tries to access page directly from URL) */}
          </Switch>
    )

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />{/**Yes we need auth Route even if we are authenticated because right at the time we are authenticated..auth Route is followed and we are redirected to checkout or root inside of Auth */}
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {/* <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            {/*<BurgerBuilder/>{/*this.state.show ? <BurgerBuilder/> : null*}
            <Checkout />
          </Switch> */}
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));

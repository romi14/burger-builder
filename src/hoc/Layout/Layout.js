import React,{Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }

    sideDrawerToggleHandler = () => {
        /*this.setState({showSideDrawer:!this.state.showSideDrawer});  Wrong approach-unexpected results*/
        this.setState((prevState) => {
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }
    render(){
        return(
            <Aux>
            <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>{/*This is the normal main element provided by HTML*/}
                {this.props.children} 
            </main>
            </Aux>
            )
        }
    }

const mapStateToProps = state => {
    return{
        isAuthenticated : state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
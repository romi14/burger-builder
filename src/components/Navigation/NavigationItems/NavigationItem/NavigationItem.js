import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        {/*<a href={props.link} 
           className={props.active ? classes.active : null}>{props.children}</a>*/}
        <NavLink to={props.link} exact//exact in NavLink is only yet used to make sure that activeClassName is used by only the active element
           activeClassName={classes.active ? classes.active : null}>{props.children}</NavLink>
    </li>
)

export default navigationItem;
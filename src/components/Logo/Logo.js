import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';//burgerLogo here will only receive the path of the image where webpack will copy it to
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height:props.height}}>

        {
        //but we cannot simply use like this because
        //in the end webpack will bundle all of the files in an output folder
        //and take only the output folder
        //This happens when we would really publish our app on production
        //so we cannot see that folder in delopment mode
        //We have to make webpack aware of the fact that we are using this image
        //So we have to import the image
        //Webpack will then handle this image with a special module that was added 
        // to webpack, to it's config...will basically copy the image to the destination directory it creates
        //, although only in memory during development...webpack will even optimize the image
        //<img src="../../assets/images/burger-logo.png"/>    
        }
        <img src={burgerLogo} alt="MyBurger"/> 

    </div>
);

export default logo;
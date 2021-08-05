import {configure,shallow} from 'enzyme';//Shallow is the most popular and the best helper method for rendering components
//shallow's main feature is that it renders all the content inside a component but the content isn't deeply rendered
//Eg. <NavigationItem /> elements inside NavigationItems.js will be like placeholders and their inner content won't be rendered
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import React from 'react';//To convert JSX into it's createElement alternative
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />',() => {//describe function is considered as a test suite
    let wrapper = null;
    beforeEach(() => {  /*it's a helper method available inside describe..will execute before each test*/
        wrapper = shallow(<NavigationItems />);
    })
    it('should render two <NavigationItem /> elements if not authenticated',() => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);//expect is made available globally by jest..no need to import
    });

    it('should render three <NavigationItem /> elements if authenticated',() => {
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);//expect is made available globally by jest..no need to import
    });
    it('should render atleast 1 Logout Link if authenticated',() => {
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);//expect is made available globally by jest..no need to import
    });
});
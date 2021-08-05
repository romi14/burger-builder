//A container simply differs from a component in the fact that it maintains it's own state
//But to test we need a component in which we simply pass props
//But what about the state, well it can easily be handled by setState()
//Also, the redux store would have posed a problem but since it only passes props to our container through a HOC..it's not a problem
//An easy way out is to add an export in the line where the container is defined(a named export)
//So along with the default export we also have like 'export class BurgerBuilder...'
//So the connection is simply removed since we are no longer using the default export

import {BurgerBuilder} from './BurgerBuilder';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />',() => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    });

    it('should render <BuildControls /> when receiving ingredients',() => {
        wrapper.setProps({ings:{salad:0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
})
import React from 'react';
import { shallow } from 'enzyme';
import { Home } from './Home';
import ControlBar from './ControlBar';
import NavigationBar from './NavigationBar';

describe('<Home />', () => {

    it('renders: default', () => {
        const children = (<div>hello, world</div>);
        const wrap = shallow(<Home>{children}</Home>);

        expect(wrap.contains(children)).toBe(true);

        expect(wrap.find(ControlBar).exists()).toBe(true);
        expect(wrap.find(NavigationBar).exists()).toBe(true);
    });

});

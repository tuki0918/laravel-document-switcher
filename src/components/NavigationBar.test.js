import React from 'react';
import { shallow } from 'enzyme';
import { NavigationBar } from './NavigationBar';

describe('<NavigationBar />', () => {
    it('default behavior', () => {
        const wrap = shallow(<NavigationBar />);

        expect(wrap.instance().items()).toHaveLength(2);

        expect(wrap.find('.tab-item').at(0).prop('className').trim()).toBe('tab-item active');
        expect(wrap.find('.tab-item').at(1).prop('className').trim()).toBe('tab-item');

        wrap.setState({ selected: 1 });
        expect(wrap.find('.tab-item').at(0).prop('className').trim()).toBe('tab-item');
        expect(wrap.find('.tab-item').at(1).prop('className').trim()).toBe('tab-item active');

        wrap.setState({ selected: 0 });
        expect(wrap.find('.tab-item').at(0).prop('className').trim()).toBe('tab-item active');
        expect(wrap.find('.tab-item').at(1).prop('className').trim()).toBe('tab-item');
    });
});

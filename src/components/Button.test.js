import React from 'react';
import { shallow } from 'enzyme';
import { Button } from './Button';

describe('<Button />', () => {

    let props;
    let wrap;

    beforeEach(() => {
        props = { current: '5.4', name: 'v5.4', value: '5.4', onChange: jest.fn() };
        wrap = shallow(<Button {...props} />);
    });

    it('renders: default', () => {
        expect(wrap.type()).toBe('button');
        expect(wrap.text()).toBe(props.name);

        expect(props.onChange).not.toBeCalled();
        wrap.simulate('click', { target: { value: props.value }});
        expect(props.onChange).toBeCalled();
        expect(props.onChange.mock.calls[0][0]).toEqual(props.value);

        expect(wrap.find('.active').exists()).toBe(true);
    });

    it('renders: not exist `.active`', () => {
        wrap.setProps({
            current: '5.5',
        });
        expect(wrap.find('.active').exists()).toBe(false);
    });

});

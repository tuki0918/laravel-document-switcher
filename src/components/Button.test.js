import React from 'react';
import { shallow } from 'enzyme';
import { Button } from './Button';

describe('<Button />', () => {

    it('renders: default', () => {
        const onChange = jest.fn();
        const props = { current: '5.4', name: 'v5.4', value: '5.4', onChange: onChange };
        const wrap = shallow(
            <Button {...props} />
        );

        expect(wrap.type()).toBe('button');
        expect(wrap.text()).toBe(props.name);

        expect(onChange).not.toBeCalled();
        wrap.simulate('click', { target: { value: props.value }});
        expect(onChange).toBeCalled();
        expect(onChange.mock.calls[0][0]).toEqual(props.value);
    });

    it('renders: `.active`', () => {
        const onChange = jest.fn();
        const props = { current: '5.4', name: 'v5.4', value: '5.4', onChange: onChange };
        const wrap = shallow(
            <Button {...props} />
        );
        expect(wrap.find('.active').exists()).toBe(true);
    });

    it('renders: not `.active`', () => {
        const onChange = jest.fn();
        const props = { current: '5.5', name: 'v5.4', value: '5.4', onChange: onChange };
        const wrap = shallow(
            <Button {...props} />
        );
        expect(wrap.find('.active').exists()).toBe(false);
    });

});

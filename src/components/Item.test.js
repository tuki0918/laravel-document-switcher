import React from 'react';
import { shallow } from 'enzyme';
import { Item } from './Item';
import { Type } from './../constants';
jest.mock('./../lib/chrome', () => {
    return {
        openTab: jest.fn(),
        moveTabs2Right: jest.fn(),
        removeTabs: jest.fn(),
    };
});
import { openTab, moveTabs2Right, removeTabs } from './../lib/chrome';

describe('<Item />', () => {

    let props;
    let wrap;

    beforeEach(() => {
        props = {
            id: 10,
            url: 'http://example.com/page10',
            title: 'Title - dummy',
            favIconUrl: 'http://example.com/icon.png',
            currentId: false,
            type: Type.Tab,
            removeFavorite: jest.fn(),
        };

        wrap = shallow(<Item {...props} />);
    });

    it('renders: default', () => {
        expect(wrap.find('.active').exists()).toBe(false);
        expect(wrap.find('.hidden').exists()).toBe(false);

        expect(wrap.find('img').at(0).prop('src').trim()).toBe(props.favIconUrl);
        expect(wrap.find('.media-body > strong').at(0).text()).toBe(props.title);
        expect(wrap.find('.media-body > p.url').at(0).text()).toBe(props.url);

        const button1 = wrap.find('span').at(0);
        expect(removeTabs).not.toBeCalled();
        button1.simulate('click');
        expect(removeTabs).toBeCalled();

        const button2 = wrap.find('div').at(0);
        expect(moveTabs2Right).not.toBeCalled();
        button2.simulate('click');
        expect(moveTabs2Right).toBeCalled();

        wrap.setState({ isDelete: true });
        expect(wrap.find('.active').exists()).toBe(false);
        expect(wrap.find('.hidden').exists()).toBe(true);
    });

    it('renders: `.active`', () => {
        wrap.setProps({
            currentId: 10,
        });

        expect(wrap.find('.active').exists()).toBe(true);
        expect(wrap.find('.hidden').exists()).toBe(false);

        wrap.setState({ isDelete: true });
        expect(wrap.find('.active').exists()).toBe(true);
        expect(wrap.find('.hidden').exists()).toBe(true);
    });

    it('renders: favorite feed', () => {
        wrap.setProps({
            type: Type.Favorite,
        });

        expect(wrap.find('.active').exists()).toBe(false);
        expect(wrap.find('.hidden').exists()).toBe(false);

        expect(wrap.find('img').at(0).prop('src').trim()).toBe(props.favIconUrl);
        expect(wrap.find('.media-body > strong').at(0).text()).toBe(props.title);
        expect(wrap.find('.media-body > p.url').at(0).text()).toBe(props.url);

        const button1 = wrap.find('span').at(0);
        expect(props.removeFavorite).not.toBeCalled();
        button1.simulate('click');
        expect(props.removeFavorite).toBeCalled();

        const button2 = wrap.find('div').at(0);
        expect(openTab).not.toBeCalled();
        button2.simulate('click');
        expect(openTab).toBeCalled();

        wrap.setState({ isDelete: true });
        expect(wrap.find('.active').exists()).toBe(false);
        expect(wrap.find('.hidden').exists()).toBe(true);
    });

});

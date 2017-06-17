import React from 'react';
import { shallow } from 'enzyme';
import { ControlBar } from './ControlBar';
import json from './../data/versions.json';
jest.mock('./../lib/chrome', () => {
    return {
        openTab2Right: jest.fn(),
    };
});
import { openTab2Right } from './../lib/chrome';

describe('<ControlBar />', () => {

    const item = {
        id: 10,
        url: 'http://example.com/page10',
        title: 'Title - dummy',
        favIconUrl: 'http://example.com/icon.png',
    };

    let props;
    let wrap;

    beforeEach(() => {
        props = {
            current: '5.4',
            versions: [],
            favorites: [],
            tab: item,
            addFavorite: jest.fn(),
            removeFavorite: jest.fn(),
        };

        wrap = shallow(<ControlBar {...props} />);
    });

    it('renders: default', () => {
        expect(wrap.instance().items()).toHaveLength(0);

        expect(wrap.instance().isActive()).toBe(false);
        expect(wrap.find('.hidden').exists()).toBe(true);

        expect(wrap.instance().isFavorite()).toBe(false);
        expect(wrap.find('.icon-star').exists()).toBe(false);
        expect(wrap.find('.icon-star-empty').exists()).toBe(true);
    });

    it('renders: 4 items', () => {
        wrap.setProps({ versions: json });
        expect(wrap.instance().items()).toHaveLength(4);
    });

    it('renders: set document page ', () => {
        wrap.setProps({
            tab: {...item, url: 'https://laravel.com/docs/5.4'},
        });

        expect(wrap.instance().isActive()).toBe(true);
        expect(wrap.find('.hidden').exists()).toBe(false);

        const button = wrap.find('button').at(0);
        expect(openTab2Right).not.toBeCalled();
        button.simulate('click');
        expect(openTab2Right).toBeCalled();
    });

    it('renders: not exist in favorites', () => {
        wrap.setProps({
            favorites: [
                {...item, url: 'http://example.com/page11'},
            ],
        });

        expect(wrap.instance().isFavorite()).toBe(false);
        expect(wrap.find('.icon-star').exists()).toBe(false);
        expect(wrap.find('.icon-star-empty').exists()).toBe(true);

        const button = wrap.find('button').at(1);
        expect(props.addFavorite).not.toBeCalled();
        expect(props.removeFavorite).not.toBeCalled();
        button.simulate('click');
        expect(props.addFavorite).toBeCalled();
        expect(props.removeFavorite).not.toBeCalled();
    });

    it('renders: already exist in favorites', () => {
        wrap.setProps({
            favorites: [
                {...item, url: 'http://example.com/page10'},
            ],
        });

        expect(wrap.instance().isFavorite()).toBe(true);
        expect(wrap.find('.icon-star').exists()).toBe(true);
        expect(wrap.find('.icon-star-empty').exists()).toBe(false);

        const button = wrap.find('button').at(1);
        expect(props.addFavorite).not.toBeCalled();
        expect(props.removeFavorite).not.toBeCalled();
        button.simulate('click');
        expect(props.addFavorite).not.toBeCalled();
        expect(props.removeFavorite).toBeCalled();
    });

});

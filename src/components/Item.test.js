import React from 'react';
import { shallow } from 'enzyme';
import { Item } from './Item';
import { Type } from './../constants';

describe('<Item />', () => {

    it('renders: default', () => {
        const props = {
            id: 10,
            url: 'http://example.com/page10',
            title: 'Title - dummy',
            favIconUrl: 'http://example.com/icon.png',
            currentId: false,
            type: Type.Tab,
            removeFavorite: jest.fn(),
        };
        const wrap = shallow(<Item {...props} />);

        expect(wrap.find('.active').exists()).toBe(false);
        expect(wrap.find('.hidden').exists()).toBe(false);

        expect(wrap.find('img').at(0).prop('src').trim()).toBe(props.favIconUrl);
        expect(wrap.find('.media-body > strong').at(0).text()).toBe(props.title);
        expect(wrap.find('.media-body > p.url').at(0).text()).toBe(props.url);

        const onClickButton = wrap.find('span').at(0).prop('onClick')();
        expect(onClickButton).toEqual(wrap.instance().closeFeed);

        const onClickFeed = wrap.find('div').at(0).prop('onClick')();
        expect(onClickFeed).toEqual(wrap.instance().moveFeed);

        wrap.setState({ isDelete: true });
        expect(wrap.find('.active').exists()).toBe(false);
        expect(wrap.find('.hidden').exists()).toBe(true);
    });

    it('renders: `.active`', () => {
        const props = {
            id: 10,
            url: 'http://example.com/page10',
            title: 'Title - dummy',
            favIconUrl: 'http://example.com/icon.png',
            currentId: 10,
            type: Type.Tab,
            removeFavorite: jest.fn(),
        };
        const wrap = shallow(<Item {...props} />);

        expect(wrap.find('.active').exists()).toBe(true);
        expect(wrap.find('.hidden').exists()).toBe(false);

        wrap.setState({ isDelete: true });
        expect(wrap.find('.active').exists()).toBe(true);
        expect(wrap.find('.hidden').exists()).toBe(true);
    });

    it('renders: favorite feed', () => {
        const props = {
            id: 10,
            url: 'http://example.com/page10',
            title: 'Title - dummy',
            favIconUrl: 'http://example.com/icon.png',
            currentId: false,
            type: Type.Favorite,
            removeFavorite: jest.fn(),
        };
        const wrap = shallow(<Item {...props} />);

        expect(wrap.find('.active').exists()).toBe(false);
        expect(wrap.find('.hidden').exists()).toBe(false);

        expect(wrap.find('img').at(0).prop('src').trim()).toBe(props.favIconUrl);
        expect(wrap.find('.media-body > strong').at(0).text()).toBe(props.title);
        expect(wrap.find('.media-body > p.url').at(0).text()).toBe(props.url);

        const onClickButton = wrap.find('span').at(0).prop('onClick')();
        expect(onClickButton).toEqual(wrap.instance().deleteFeed);

        const onClickFeed = wrap.find('div').at(0).prop('onClick')();
        expect(onClickFeed).toEqual(wrap.instance().openFeed);

        wrap.setState({ isDelete: true });
        expect(wrap.find('.active').exists()).toBe(false);
        expect(wrap.find('.hidden').exists()).toBe(true);
    });

});
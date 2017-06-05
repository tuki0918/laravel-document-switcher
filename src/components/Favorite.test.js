import React from 'react';
import { shallow } from 'enzyme';
import { Favorite } from './Favorite';

describe('<Favorite />', () => {
    it('default behavior', () => {
        const item = {
            id: 10,
            url: 'http://example.com/page10',
            title: 'Title - dummy',
            favIconUrl: 'http://example.com/icon.png',
        };

        const props = {
            favorites: [],
        };

        const wrap = shallow(<Favorite {...props} />);

        // 0 item
        expect(wrap.instance().items()).toHaveLength(0);
        expect(wrap.find('.not-found').exists()).toBe(true);

        // 1 item
        wrap.setProps({
            favorites: [
                item,
            ],
        });
        expect(wrap.instance().items()).toHaveLength(1);
        expect(wrap.find('.not-found').exists()).toBe(false);

        // 3 item
        wrap.setProps({
            favorites: [
                item,
                item,
                item,
            ],
        });
        expect(wrap.instance().items()).toHaveLength(3);
        expect(wrap.find('.not-found').exists()).toBe(false);
    });
});
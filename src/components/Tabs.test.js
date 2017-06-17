import React from 'react';
import { shallow } from 'enzyme';
import { Tabs } from './Tabs';

describe('<Tabs />', () => {

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
            tab: item,
        };

        wrap = shallow(<Tabs {...props} />);
    });

    it('renders: default', () => {
        expect(wrap.instance().items()).toHaveLength(0);
        expect(wrap.find('.not-found').exists()).toBe(true);
    });

    it('renders: 1 items', () => {
        wrap.setState({
            tabs: [
                item,
            ],
        });
        expect(wrap.instance().items()).toHaveLength(1);
        expect(wrap.find('.not-found').exists()).toBe(false);
    });

    it('renders: 3 items', () => {
        wrap.setState({
            tabs: [
                item,
                item,
                item,
            ],
        });
        expect(wrap.instance().items()).toHaveLength(3);
        expect(wrap.find('.not-found').exists()).toBe(false);
    });

});

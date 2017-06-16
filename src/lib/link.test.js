import { checkURL, convertToURL, FLAG } from './link';

describe('Module: link', () => {

    it('checkURL: English document', () => {
        const urls = [
            'https://laravel.com/docs/',
            'https://laravel.com/docs/master',
            'https://laravel.com/docs/master/',
            'https://laravel.com/docs/master/releases',
            'https://laravel.com/docs/master/releases#versioning-scheme',
            'https://laravel.com/docs/5.4',
            'https://laravel.com/docs/5.4/',
            'https://laravel.com/docs/5.4/releases',
            'https://laravel.com/docs/5.4/releases#versioning-scheme',
            'https://laravel.com/docs/4.2',
            'https://laravel.com/docs/4.2/',
            'https://laravel.com/docs/4.2/releases',
            'https://laravel.com/docs/4.2/releases#laravel-4.2',
        ];

        urls.forEach(function(value, index, array) {
            expect(checkURL(value)).toBe(FLAG.ENG_DOC);
        });
    });

    it('checkURL: Japanese document', () => {
        const urls = [
            'https://readouble.com/laravel/',
            'https://readouble.com/laravel/5.4/',
            'https://readouble.com/laravel/5.4/ja/',
            'https://readouble.com/laravel/5.4/ja/upgrade',
            'https://readouble.com/laravel/5.4/ja/upgrade.html',
            'https://readouble.com/laravel/5.4/ja/upgrade.html#upgrade-5.4.0',
        ];

        urls.forEach(function(value, index, array) {
            expect(checkURL(value)).toBe(FLAG.JPN_DOC);
        });
    });

    it('checkURL: not categorized document', () => {
        const urls = [
            'http://example.com/',
            'http://example.com/docs/',
            'http://example.com/laravel/',
            'https://www.yahoo.co.jp/',
            'https://www.google.co.jp/',
        ];

        urls.forEach(function(value, index, array) {
            expect(checkURL(value)).toBe(FLAG.NOT_DOC);
        });
    });

    it('convertToURL: convert English to Japanese (v5.4)', () => {
        const urls = {
            'https://laravel.com/docs/': 'https://readouble.com/laravel/5.4/ja/',
            'https://laravel.com/docs/master': 'https://readouble.com/laravel/5.4/ja/',
            'https://laravel.com/docs/master/': 'https://readouble.com/laravel/5.4/ja/',
            'https://laravel.com/docs/master/releases': 'https://readouble.com/laravel/5.4/ja/releases',
            'https://laravel.com/docs/master/releases#versioning-scheme': 'https://readouble.com/laravel/5.4/ja/releases#versioning-scheme',
            'https://laravel.com/docs/5.4': 'https://readouble.com/laravel/5.4/ja/',
            'https://laravel.com/docs/5.4/': 'https://readouble.com/laravel/5.4/ja/',
            'https://laravel.com/docs/5.4/releases': 'https://readouble.com/laravel/5.4/ja/releases',
            'https://laravel.com/docs/5.4/releases#versioning-scheme': 'https://readouble.com/laravel/5.4/ja/releases#versioning-scheme',
            'https://laravel.com/docs/4.2': 'https://readouble.com/laravel/5.4/ja/',
            'https://laravel.com/docs/4.2/': 'https://readouble.com/laravel/5.4/ja/',
            'https://laravel.com/docs/4.2/releases': 'https://readouble.com/laravel/5.4/ja/releases',
            'https://laravel.com/docs/4.2/releases#laravel-4.2': 'https://readouble.com/laravel/5.4/ja/releases#laravel-4.2',
        };

        Object.keys(urls).forEach(key => {
            expect(convertToURL(key, '5.4')).toBe(urls[key]);
        });
    });

    it('convertToURL: convert Japanese to Japanese (v4.2)', () => {
        const urls = {
            'https://readouble.com/laravel/5.4/ja/': 'https://readouble.com/laravel/4.2/ja/',
            'https://readouble.com/laravel/5.4/ja/releases': 'https://readouble.com/laravel/4.2/ja/releases',
            'https://readouble.com/laravel/5.4/ja/releases#versioning-scheme': 'https://readouble.com/laravel/4.2/ja/releases#versioning-scheme',
            'https://readouble.com/laravel/5.0/ja/': 'https://readouble.com/laravel/4.2/ja/',
            'https://readouble.com/laravel/5.0/ja/releases': 'https://readouble.com/laravel/4.2/ja/releases',
            'https://readouble.com/laravel/5.0/ja/releases#versioning-scheme': 'https://readouble.com/laravel/4.2/ja/releases#versioning-scheme',
            'https://readouble.com/laravel/4.2/ja/': 'https://readouble.com/laravel/4.2/ja/',
            'https://readouble.com/laravel/4.2/ja/releases': 'https://readouble.com/laravel/4.2/ja/releases',
            'https://readouble.com/laravel/4.2/ja/releases#laravel-4.2': 'https://readouble.com/laravel/4.2/ja/releases#laravel-4.2',
        };

        Object.keys(urls).forEach(key => {
            expect(convertToURL(key, '4.2')).toBe(urls[key]);
        });
    });

    it('convertToURL: Error', () => {
        const urls = {
            'http://example.com/': '',
            'http://example.com/docs/': '',
            'http://example.com/laravel/': '',
            'https://www.yahoo.co.jp/': '',
            'https://www.google.co.jp/': '',
        };

        Object.keys(urls).forEach(key => {
            expect(convertToURL(key, '5.4')).toBe(urls[key]);
        });
    });
});

const { test, expect } = require('@jest/globals');
const { getURLsFromHTML } = require('./crawl');

test('case: no url', () => {
    const htmlBody = '<p>lorem ipsum</p>';
    const baseUrl = 'http://example.com';
    expect(getURLsFromHTML(htmlBody, baseUrl)).toStrictEqual([]);
});

test('case: absolute url', () => {
    const htmlBody = '<a href="http://example.com/absolute.html">This is an absolute link</a>';
    const baseUrl = 'http://example.com';
    expect(getURLsFromHTML(htmlBody, baseUrl)).toStrictEqual(['http://example.com/absolute.html']);
});

test('case: relative url', () => {
    const htmlBody = '<a href="/relative.html">This is a relative link</a>';
    const baseUrl = 'http://example.com';
    expect(getURLsFromHTML(htmlBody, baseUrl)).toStrictEqual(['http://example.com/relative.html']);
});

test('case: multiple urls', () => {
    const htmlBody = '<div><a href="http://example.com/absolute.html">This is an absolute link</a><p>loremipsum</p></div><a href="/relative.html">This is a relative link</a>';
    const baseUrl = 'http://example.com';
    expect(getURLsFromHTML(htmlBody, baseUrl)).toStrictEqual(['http://example.com/absolute.html', 'http://example.com/relative.html'])
});


const { test, expect } = require('@jest/globals');
const { normalizeUrl } = require('./crawl');

test('normalize url starting with http drops the scheme', () => {
    expect(normalizeUrl('http://example.com')).toBe('example.com');
});

test('normalize url starting with https drops the scheme', () => {
    expect(normalizeUrl('https://example.com')).toBe('example.com');
});

test('normalize url ending with slash drops the slash', () => {
    expect(normalizeUrl('example.com/')).toBe('example.com');
});

test('normalize an already normalized url returns the url', () => {
    const correctUrl = 'example.com/words/something?query=query#fragment';
    expect(normalizeUrl(correctUrl)).toBe(correctUrl);
});


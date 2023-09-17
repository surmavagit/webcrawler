const { test, expect } = require('@jest/globals');
const { normalizeUrl } = require('./crawl');

test('normalize url starting with http drops the scheme', () => {
    expect(normalizeUrl('http://example.com')).toBe('example.com');
});

test('normalize url starting with https drops the scheme', () => {
    expect(normalizeUrl('https://example.com')).toBe('example.com');
});

test('normalize url ending with slash drops the schema and slash', () => {
    expect(normalizeUrl('http://example.com/')).toBe('example.com');
});

test('url ending with a path and a slash drops the schema and slash', () => {
    expect(normalizeUrl('http://example.com/path/')).toBe('example.com/path')
});

test('url ending with a path without a slash drops the schema', () => {
    expect(normalizeUrl('http://example.com/path')).toBe('example.com/path')
});


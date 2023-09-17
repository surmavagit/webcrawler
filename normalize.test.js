const { test, expect } = require('@jest/globals');
const { normalizeUrl } = require('./crawl');

test('normalize url starting with http drops the scheme', () => {
    expect(normalizeUrl('http://example.com')).toBe('example.com');
});


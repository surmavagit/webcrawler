const { JSDOM } = require('jsdom');

function normalizeUrl(urlString) {
    const parsed = new URL(urlString);
    if (parsed.pathname.endsWith('/')) {
        return parsed.host + parsed.pathname.slice(0, -1)
    }
    return parsed.host + parsed.pathname
}

function getURLsFromHTML(htmlBody, baseURL) {
    return [];
}

module.exports = { normalizeUrl, getURLsFromHTML }


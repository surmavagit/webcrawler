const { JSDOM } = require('jsdom');

function normalizeUrl(urlString) {
    const parsed = new URL(urlString);
    if (parsed.pathname.endsWith('/')) {
        return parsed.host + parsed.pathname.slice(0, -1)
    }
    return parsed.host + parsed.pathname
}

function getURLsFromHTML(htmlBody, baseURL) {
    const result = [];
    const dom = new JSDOM(htmlBody);
    const aTags = dom.window.document.querySelectorAll('a');
    aTags.forEach(tag => {
        let urlString = tag.getAttribute('href');
        function isRelative(url) {
            if (url.startsWith('http://') || url.startsWith('https://')) {
                return false;
            }
            return true;
        }
        if (isRelative(urlString)) {
            if (!baseURL.endsWith('/') && !urlString.startsWith('/')) {
                urlString = '/' + urlString;
            }
            urlString = baseURL + urlString;
        };
        if (!result.includes(urlString)) {
            result.push(urlString);
        };
    });
    return result;
}

module.exports = { normalizeUrl, getURLsFromHTML }


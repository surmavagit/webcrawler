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

async function crawlPage(baseURL) {
    let response;
    try {
        response = await fetch(baseURL);
    } catch (err) {
        console.error(err);
        return;
    }
    if (!response.ok) {
        console.error(response.statusText);
        return;
    }
    const contentType = response.headers.get('content-type');
    if (!contentType.startsWith('text/html')) {
        console.error('wrong content type: ' + contentType);
        return;
    }
    const text = await response.text();
    console.log(text);
}

module.exports = { normalizeUrl, getURLsFromHTML, crawlPage }


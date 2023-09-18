const { JSDOM } = require('jsdom');

function normalizeUrl(urlString) {
    const parsed = new URL(urlString);
    const domain = parsed.host + parsed.pathname;
    if (domain.endsWith('/')) {
        return domain.slice(0, -1);
    }
    return domain
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

async function crawlPage(baseURL, currentURL, pages) {
    const baseNorm = normalizeUrl(baseURL);
    const currNorm = normalizeUrl(currentURL);
    if (!currNorm.startsWith(baseNorm)) {
        return pages;
    }

    if (pages[currNorm] !== undefined) {
        pages[currNorm]++;
        return pages;
    } else {
        pages[currNorm] = 1;
        if (currNorm == baseNorm) {
            pages[currNorm] = 0;
        }
        console.log('requesting ' + currentURL);
        try {
            const response = await fetch(currentURL);
            if (!response.ok || !response.headers.get('content-type').startsWith('text/html')) {
                console.error('something went wrong with the request to: ' + currentURL);
            } else {
                const html = await response.text();
                const links = getURLsFromHTML(html, baseURL);
                for (let link of links) {
                    pages = await crawlPage(baseURL, link, pages);
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            return pages;
        }
    }

}

module.exports = { normalizeUrl, getURLsFromHTML, crawlPage }


function printReport(pagesObj) {
    console.log('Report is starting...');
    sortPages(pagesObj).forEach(
        page => console.log(`Found ${page.count} internal links to ${page.url}`)
    );
    console.log('End of report');
}

function sortPages(pagesObj) {
    const pagesArr = [];
    for (let page in pagesObj) {
        pagesArr.push({ url: page, count: pagesObj[page] });
    }
    return pagesArr.sort((a, b) => b.count - a.count);
}

module.exports = { printReport, sortPages };

const { crawlPage } = require('./crawl');

const argIndex = 2;

function main() {
    if (process.argv.length < argIndex + 1) {
        throw new Error("command line argument not provided");
    } else if (process.argv.length > argIndex + 1) {
        throw new Error("too many command line arguments");
    }
    const baseURL = process.argv[argIndex];
    console.log(`Crawler starts at ${baseURL}`)
    crawlPage(baseURL, baseURL, {}).then(pages => {
        console.log('\nRESULTS:');
        for (let page in pages) {
            console.log(`${pages[page]}     ${page}`)
        }
    })
}

main();


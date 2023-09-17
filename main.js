const argIndex = 2;

function main() {
    if (process.argv.length < argIndex + 1) {
        throw new Error("command line argument not provided");
    } else if (process.argv.length > argIndex + 1) {
        throw new Error("too many command line arguments");
    }
    const baseURL = process.argv[argIndex];
    console.log(`Crawler starts at ${baseURL}`)
}

main();


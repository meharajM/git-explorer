const fs = require("fs");
const searchCommit = require('./api').searchCommit;
function handleResponse(response) {
    const parsedMessage = JSON.parse(response).items;
    if(parsedMessage && parsedMessage[0] && parsedMessage[0].commit) {
        console.log("-----------------------------\nTotal Search results: ", parsedMessage.length)
        console.log('\n----------- Commit ------------\n', parsedMessage[0].commit.message); // Print the HTML for the Google homepage.
        fs.writeFileSync('./server/commits.txt', JSON.stringify(parsedMessage));//sync file write  
    } else {
        console.log("No commits were found for search term");
    }
}
async function searchCommitMessage(term) {
    const repo = "nodejs/node";
    searchCommit({repo, queryParams: {'q': `${term}+repo:nodejs/node`}}, handleResponse);
}
const term = process.argv[2];
searchCommitMessage(term)
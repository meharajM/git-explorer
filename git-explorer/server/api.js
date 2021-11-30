const request = require('request');
const token = "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" // has to be changed while running
function getReuest(url)  {
    return {
        headers: {
        'User-Agent': 'request',
        'Authorization': `token ${token}`
        },
        url: url,
        method: 'GET'
    }
}
function searchCommit({queryParams}, handleResponse)  {
    let gitUrl = `https://api.github.com/search/commits`;//api end point to serch term
    callApi(queryParams, gitUrl, handleResponse);

}
function getCommits({repo, queryParams}, handleResponse) {
    console.log("repo", repo)
    let gitUrl = `https://api.github.com/repos/${repo}/commits`;//api end point to serch term
    callApi(queryParams, gitUrl, handleResponse);
}
function callApi(queryParams, url, handleResponse) {
    let gitUrl  = url;
    if(queryParams) {
        const qp = Object.keys(queryParams);
        gitUrl = `${gitUrl}?`
        for (let i = 0; i< qp.length; i++) {
            gitUrl = `${gitUrl}${qp[i]}=${queryParams[qp[i]]}`;
            if (i <= qp.length - 2) {
                gitUrl = `${gitUrl}&`
            }
        }
    }
    const req = getReuest(gitUrl);
    console.log("sending request:", gitUrl);
    request(req, (error, response, body) => {
        if (response && response.statusCode === 200) {
            handleResponse(body);
        } else {
            console.log("Error: ", body);
        }
    }); // works with call backs for promises need to use bluebird version
}
function getCommitDetails(commitUrl, handleResponse) {
    const req = getReuest(commitUrl);
    request(req, (error, response, body) => {
        if (response && response.statusCode === 200) {
            handleResponse(JSON.parse(body));
        } else {
            console.log("Error: ", body);
        }
    });
}
exports.getCommits = getCommits;
exports.getCommitDetails = getCommitDetails;
exports.searchCommit = searchCommit;
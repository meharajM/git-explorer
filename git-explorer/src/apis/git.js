export async function getCommits (repo, since, until) {
    let gitUrl = `https://api.github.com/repos/${repo}/commits`;
    if (since || until) {
        gitUrl = `${gitUrl}?`;
        if (since) {
            gitUrl = `${gitUrl}since=${since}`;
        }
        if (until) {
            gitUrl = since ? `${gitUrl}&until=${until}` : `${gitUrl}until=${until}`
        }
    }
    console.log(gitUrl);
    const commits = await fetch(gitUrl);
    return commits.json();
}
export async function getDevGraphData() {
    const url = "http://localhost:3030/api/developers"
    const commits = await fetch(url);
    return commits.json();
}
export async function getCommitDetails(commitUrl) {
    const commits = await fetch(commitUrl);
    return commits.json();
}
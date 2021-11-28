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
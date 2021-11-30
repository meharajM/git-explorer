import {getCommits, getCommitDetails, getDevGraphData} from './git';
global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve([])
}))
describe("APIs", () => {
    describe("getCommits", () => {
        test("should make call to gihub api commits to fetch list of commits of given repo", () => {
            const repo = "nodejs/node";
            let gitUrl = `https://api.github.com/repos/${repo}/commits`;
            getCommits(repo);
            expect(fetch).toHaveBeenCalledWith(gitUrl)
        });
        test("should call with given query params", () => {
            const repo = "nodejs/node";
            let gitUrl = `https://api.github.com/repos/${repo}/commits`;

            const since = "01/01/2020";
            getCommits(repo, since);
            expect(fetch).toHaveBeenCalledWith(`${gitUrl}?since=${since}`);

            const until = "01/01/2020";
            getCommits(repo, since, until);
            expect(fetch).toHaveBeenCalledWith(`${gitUrl}?since=${since}&until=${until}`);

            getCommits(repo, null, until);
            expect(fetch).toHaveBeenCalledWith(`${gitUrl}?until=${until}`);

            getCommits(repo, undefined, until);
            expect(fetch).toHaveBeenCalledWith(`${gitUrl}?until=${until}`);

        })
    })

    describe("getCommitDetails", () => {
        test("should make api call to given git url to fetch details", () => {
            let gitUrl = `https://api.github.com/repos/nodejs/node/commits/6786878798rjefur8eu8`;
            getCommitDetails(gitUrl);
            expect(fetch).toHaveBeenCalledWith(gitUrl);
        })
    })

    describe("getDevGraphData",  () => {
        test("should make api call to get graph data", () => {
            const url = "http://localhost:3030/api/developers";
            getDevGraphData();
            expect(fetch).toHaveBeenCalledWith(url);
        })
    })

})
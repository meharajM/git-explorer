const express = require('express')
const api = require('./api');
const cors = require('cors');
const {getCommitDetails, getCommits}  =  api;
const app = express()
app.use(cors())
function getDevFiles(repo, resHandler)  {
    const developers = {'dev': ['files changes']}
    const handler = resHandler;
    let counter = 1;
    getCommits({repo, queryParams: {'per_page': 40}}, (response) => {
        const commits = JSON.parse(response);
        for (let i = 0; i < commits.length; i++) {
            const commitUrl = commits[i].url;
            getCommitDetails(commitUrl, (commitDetail)  => {
                const dev = commitDetail.commit.author.name;
                const files = commitDetail.files.map(file => file.filename);
                if (developers[dev]) {
                    developers[dev] = [...developers[dev], ...files].reduce((acc, file) => {
                        if(acc.indexOf(file) < 0) {
                            acc.push(file)
                        }
                        return acc;
                    },[]);
                } else {
                    developers[dev] = files;
                }
                counter += 1;
                if (commits.length === counter)  {
                    // console.log("dev", developers)
                    handler(developers)
                }

            })
        }
    });
}

app.get('/api/developers', function (req, res) {
    const repo = "nodejs/node";
    getDevFiles(repo, (devs) => {
        const devArr = Object.keys(devs);
        const filesMap = {};
        for (let i = 0; i < devArr.length; i++) {
            const files = devs[devArr[i]];
            for(let j = 0; j < files.length; j++) {
                if(filesMap[files[j]]) {
                    filesMap[files[j]] = [...filesMap[files[j]], devArr[i]]
                } else {
                    filesMap[files[j]] = [devArr[i]]
                }
            }
        }
        const files = Object.keys(filesMap);
        const devsMap = {};
        for (let i = 0; i < files.length; i++) {
            const devs = filesMap[files[i]];
            if (devs.length > 1) {
                for(let j = 0; j < devs.length; j++) {
                    if(devsMap[devs[j]]) {
                        devsMap[devs[j]] = [...devsMap[devs[j]], ...devs]
                    } else {
                        devsMap[devs[j]] = [...devs]
                    }
                }
            }
        }
        const result = Object.keys(devsMap).reduce((acc, dev) => {
            acc[dev] = {};
            devsMap[dev].forEach(element => {
                if (element !== dev) {
                    if (acc[dev][element]) {
                        acc[dev][element] += 1;
                    } else {
                        acc[dev][element] = 1;
                    }
                }
            });
            return acc;
        }, {})
        console.log("devMap",  result);
        res.json(result)
    })
    return
})

app.listen(3030)
// getDevFiles("nodejs/node");
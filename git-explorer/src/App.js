import { useState, useEffect } from 'react';
import List from './components/List';
import CommitDetails from './components/CommitDetails'
import Filter from './components/Filter';
import {getCommits} from './apis/git';
import './App.css';

function App() {
  const [commits, setCommits] = useState([])
  const [since, setSince]  = useState(null);
  const [until, setUntil] = useState(null);
  const [selectedCommit, setSelectedCommit] = useState(null);
  const repository = "nodejs/node";
  async function getData() {
    setCommits([]);
    const commitsList = await getCommits(repository, since, until);
    setCommits(commitsList);
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className="App">
      <div className="App-container">
        {selectedCommit ? 
          <div>
            <CommitDetails commit={selectedCommit} onClose={() => setSelectedCommit(null)}/>
          </div>
          :
          <div className="app-container">
          <Filter onSince={setSince} onUntil={setUntil} since={since} until={until} onApplyFilter={getData}/>
          {commits.length ? 
            <List commits={commits} onCommitSelect={(commit) => setSelectedCommit(commit)}/> 
            :
            <div>Loading....</div> }
        </div>
        }
      </div>
    </div>
  );
}

export default App;

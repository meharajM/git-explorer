import { useState, useEffect } from 'react';
import List from './components/List';
import CommitDetails from './components/CommitDetails'
import Filter from './components/Filter';
import DevGraph from './components/DevGraph';
import {getCommits} from './apis/git';
import './App.css';

function App() {
  const [showGraph, setShowGraph] = useState(false);
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
    if(!showGraph) {
      getData();
    }
  }, [])
  return (
    <div className="App">
      {!showGraph ? <div className="App-container">
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
        <button onClick={() => setShowGraph(true)}>Show graph</button>
      </div>
      :
      <div>
        <button onClick={() => setShowGraph(false)}>Show commits</button>
      <DevGraph/>
      </div>

}
    </div>
  );
}

export default App;

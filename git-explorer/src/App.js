import { useState, useEffect } from 'react';
import List from './components/List';
import CommitDetails from './components/CommitDetails'
import {getCommits} from './apis/git';
import './App.css';

function App() {
  const [commits, setCommits] = useState([])
  const [since, setSince]  = useState(null);
  const [until, setUntil] = useState(null);
  const [selectedCommit, setSelectedCommit] = useState(null);
  const repository = "nodejs/node";
  async function getData() {
    const commitsList = await getCommits(repository, since, until);
    setCommits(commitsList);
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className="App">
      {selectedCommit ? 
      <div>
        <CommitDetails commit={selectedCommit} onClose={() => setSelectedCommit(null)}/>
      </div>
      :
      <div>
        <input type="date" onChange={(ev) => setSince(ev.target.value)} placeholder="Since" value={since}/>
        <input type="date" onChange={(ev) => setUntil(ev.target.value)} placeholder="Until" value={until}/>
        <button onClick={() => getData()}> Go </button>
        {commits.length ? 
          <List commits={commits} onCommitSelect={(commit) => setSelectedCommit(commit)}/> 
          :
          <div>Loading....</div> }
      </div>
    }
      
      

    </div>
  );
}

export default App;

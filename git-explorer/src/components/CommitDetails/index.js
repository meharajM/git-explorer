import { useEffect,useState } from 'react';
import CommmitMessage from '../CommitMessage';
import {getCommitDetails} from '../../apis/git'
import './style.css';
export default function CommitDetails({commit, onClose}) {
    const [commitDetails, setCommitDetails] = useState(null);
    useEffect(() => {
        async function get() {
            const details =  await getCommitDetails(commit);
            setCommitDetails(details);
        }
        get()
    }, [])
    return commitDetails ? <div className="commit-summary">
        <div className="commit-sha"><a href={commit.html_url}>{commitDetails.sha}</a></div>
        <CommmitMessage>
            {commitDetails.commit.message}
        </CommmitMessage>
        <button onClick={onClose}>Close</button>
    </div> : <div>Loading....</div>
}
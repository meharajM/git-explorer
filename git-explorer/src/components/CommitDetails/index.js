import CommmitMessage from '../CommitMessage';
import './style.css';
export default function CommitDetails({commit, onClose}) {
    return <div className="commit-summary">
        <div className="commit-sha"><a href={commit.html_url}>{commit.sha}</a></div>
        <CommmitMessage>
            {commit.commit.message}
        </CommmitMessage>
        <button onClick={onClose}>Close</button>
    </div>
}
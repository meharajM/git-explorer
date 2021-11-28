export default function CommitDetails({commit, onClose}) {
    return <div>
        <div>
            {commit.message}
        </div>
        <button onClick={onClose}>Close</button>
    </div>
}
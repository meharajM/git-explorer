import './style.css';
export default function List({commits, onCommitSelect}){
    return <div className="commits-list">
        {commits.map((commitDetails) => {
            const {commit, author} = commitDetails;
            return <div onClick={() => onCommitSelect(commitDetails.url)} className="commit" data-testid="commit">
                <div className="commit-message">
                    {commit.message.split('\n')[0]}
                </div>
                <div className="commit-details">
                    <img src={author.avatar_url} alt={author.login} title={author.login} className="user-avtar"/>
                    <div className="user-name-date"><div className="user-name">{author.login}</div>{commit.author.date}</div>
                </div>
            </div>
        })}
        </div>
}
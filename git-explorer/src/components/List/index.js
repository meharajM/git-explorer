export default function List({commits, onCommitSelect}){
    return <div>
        {commits.map(({commit}) => (
            <div onClick={() => onCommitSelect(commit)}>
                <div>
                    <div>{commit.message.split('\n')[0]}</div>
                </div>
                <div>
                    {commit.author.date}
                </div>
            </div>
        ))}
        </div>
}
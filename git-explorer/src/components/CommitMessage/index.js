import './style.css'
import {getParsedMessage} from '../../utils'
export default function CommitMessage(props){
    const children = props.children.split('\n').map(child => {
        return getParsedMessage(child);
    })
return <div className="message">
    {children.map(child => <div className="line" data-testid="line">{child}</div>)}
</div>

}
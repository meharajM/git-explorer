import './style.css'
import {isValidUrl, isValidEmail} from '../../utils'
export default function CommitMessage(props){
    const children = props.children.split('\n').map(child => {
        let newChild = child.split(' ');
        return newChild.map(nc => {
            let str = nc;
            if (isValidUrl(nc)) {
                str = <a href={nc}>{nc}</a>;
            } else if(isValidEmail(nc)) {
                str = <a href={`mailto:${nc}`}>{nc}</a>;
            }
            return str;
        });
        debugger

        // return newChild.join(' '); 
    })
return <div className="message">
    {children.map(child => <div className="line">{child}</div>)}
</div>

}
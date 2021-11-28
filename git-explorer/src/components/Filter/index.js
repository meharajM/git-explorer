import './style.css';
export default function Filter({onSince, onUntil, onApplyFilter, since, until}) {
    return (
        <div className="filter">
            <input type="date" onChange={(ev) => onSince(ev.target.value)} placeholder="Since" value={since}/>
            <input type="date" onChange={(ev) => onUntil(ev.target.value)} placeholder="Until" value={until}/>
            <button onClick={() => onApplyFilter()}> Go </button>
        </div>
        
    )
}
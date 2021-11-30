import './style.css';
export default function Filter({onSince, onUntil, onApplyFilter, since, until}) {
    return (
        <div className="filter" data-testid="filter">
            <input data-testid="since" type="date" onChange={(ev) => onSince(ev.target.value)} placeholder="Since" value={since}/>
            <input data-testid="until" type="date" onChange={(ev) => onUntil(ev.target.value)} placeholder="Until" value={until}/>
            <button data-testid="apply-filter" onClick={() => onApplyFilter()}> Go </button>
        </div>
        
    )
}
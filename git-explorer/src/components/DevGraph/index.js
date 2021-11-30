import cytoscape from 'cytoscape';
import { useEffect, useRef, useState } from 'react';
import {getDevGraphData} from '../../apis/git';
const eles =   [{ data: { id: 'ar-src' } },
{ data: { id: 'ar-tgt' } },
{ data: { source: 'ar-src', target: 'ar-tgt', label: 'autorotate (move my nodes)' }, classes: 'autorotate' },]
function getConnectionGraph(devRelations) {
    const users = Object.keys(devRelations);

    let newElements = {nodes:[], edges: []};
    for (let i = 0; i < users.length; i++) {
        const connectionsMap = devRelations[users[i]];
       const connections =  Object.keys(connectionsMap);
       for(let j = 0; j < connections.length; j++) {
        console.log("connectionsMap", connections[j]);

           const node = {data: {id: connections[j], name:connections[j] }};
           newElements.nodes.push(node);
           if(connections[i])  {
            const edge = {data: {source: users[i], target: connections[i], label: connectionsMap[connections[j]]}}
            newElements.edges.push(edge)
           }
       }
    }
    return newElements;

}
function plotGraph(elements, container) {
    cytoscape({ elements, container,   layout: {
        name: 'grid',
        cols: 3,
        style: [ // the stylesheet for the graph
            {
              selector: 'node',
              style: {
                'background-color': '#666',
                'label': 'data(id)'
              }
            },
        
            {
              selector: 'edge',
              style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier'
              }
            }
          ],
      }, });
}
export default function DevGraph() {
    const graphEl = useRef(null)
    const [elements, setElements] = useState([]);
    useEffect(() => {
        async function get() {
         const devRelations = await getDevGraphData();
         const eles = getConnectionGraph(devRelations)
            console.log("devRelations", devRelations)
            console.log(eles)
            setElements(eles)
            plotGraph(eles, graphEl.current)
        }
        get()
        // plotGraph(getConnectionGraph( {dev1: {dev2: 1}, dev2: {dev1:  1, dev3: 2}, dev3:  {dev2:2}}), graphEl.current)
    },[])
    return <div id="graph" ref={graphEl} style={{ height: '100vh'}}>
        {elements.length === 0 && <span>Loading......</span>}
    </div>
}
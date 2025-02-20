import * as d3 from 'd3';
import * as d3Leg from 'd3-svg-legend';
import {useEffect, useRef } from 'react';
function Graph({ docs, displayedDocs }) {
  const svgRef = useRef(); // Create a reference to the svg element
  //Set the width and height of the svg
  // var width = d3.select('#root').node().getBoundingClientRect().width;
  var width = window.innerWidth;
  const height = width * 0.6;

  useEffect(() => {
    const types = Array.from(new Set(docs
      .flatMap(d => d[2]) // Get all the links in one array
      .filter(x => x !== undefined) // Filter out undefined values
      .map(x => x.verb) // Gets the verb (link type) from each link
    ));
    const color = d3.scaleOrdinal(types, d3.schemeCategory10); // Create a color scale for types
    const nodes = docs.map(d => {
      return { id: d[0], title: d[1] };
    }); // Get all nodes as unique values
    const links = docs.filter(d => d[2] !== undefined && d[2].map(l => l.object).every(o => displayedDocs.includes(o))) // Filter out undefined values and links to undisplayed documents
      .flatMap(d =>
        d[2].map(l => ({
          source: d[0],
          type: l.verb,
          target: l.object
        }))
      ); // Flatten the array of arrays into a single array

    const simulation = d3.forceSimulation(nodes) // Create a force simulation on nodes
      .force('link', d3.forceLink(links).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-500)) // Create a repulsion force between nodes
      .force('x', d3.forceX(width / 2.5)) // Apply a force that attracts nodes toward the center along the X-axis
      .force('y', d3.forceY(height / 2.5)); // Apply a force that attracts nodes toward the center along the X-axis

    const svgContainer = d3.select(svgRef.current);// Select the div element with the svg reference

    const svg = svgContainer
      .append('svg') // Create an svg element and sets its attributes
      .attr('className', 'graph')
      .attr('viewBox', [0, 0 / 3, width, height])
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('style', 'font: 12px sans-serif;');

    // Per-type markers, as they don't inherit styles.
    svg.append('defs').selectAll('marker') // Creates a reusable marker for the arrow heads
      .data(types)
      .join('marker') // Creates a marker element for each type
      .attr('id', d => `arrow-${d}`) // example id: arrow-suit
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 15) // Marker position
      .attr('refY', -0.5)
      .attr('markerWidth', 6) // Marker dimensions
      .attr('markerHeight', 6)
      .attr('orient', 'auto') // Marker orients itself based on the direction of the path
      .append('path')
      .attr('fill', color) // Set the color of the marker using the color scale
      .attr('d', 'M0,-5L10,0L0,5'); // Draws the arrow head

    const link = svg.append('g') // Create a group element in the svg and set its style attributes
      .attr('fill', 'none')
      .attr('stroke-width', 1.5)
      .selectAll('path') // For each link, creates a path element and sets its attributes
      .data(links)
      .join('path')
      .attr('stroke', d => color(d.type)) // Sets the color of the path based on the type
      .attr('marker-end', d => `url(${new URL(`#arrow-${d.type}`, window.location)})`); // Adds an arrow marker at the end of each path.

    const node = svg.append('g') // Create a group element for each node in the svg and set its attributes
      .attr('fill', 'currentColor')
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .selectAll('g') // Set each node in the data as draggable
      .data(nodes)
      .join('g')
      .call(drag(simulation));

    node.append('circle') // Create the circle visual for each node
      .attr('stroke', 'white') // Sets the outline as white
      .attr('stroke-width', 1.5)
      .attr('r', 4);

    node.append('a') // Creates the name of each node
      .attr('href', d => `../${d.id}`) // Links to the document page
      .attr('style', 'text-decoration: none; color: black !important;')
      .append('text') // Adds the text to the node
      .text(d => d.title)
      .attr('x', 8)
      .attr('y', '0.31em');

    //Create the legend
    svg.append('g')
      .attr('class', 'legendLinear');

    var legendLinear = d3Leg.legendColor()
      .shapeWidth(30)
      .orient('vertical')
      .scale(color);

    svg.select('.legendLinear')
      .call(legendLinear);

    try { // Runs the simulation
      simulation.on('tick', () => {
        link.attr('d', linkArc); // Create the links between nodes
        node.attr('transform', d => `translate(${d.x},${d.y})`); // Move the nodes to their new positions
      });
    } catch (error) {
      simulation.stop();
      console.log(error);
    }

    return () => {
      svgContainer.selectAll('*').remove();
    };
  }, [displayedDocs, docs, height, width]);

  //Return the referenced element to render everything
  return (
    <div ref={svgRef} width="100%" height="100%">
    </div>
  );

}

//Draw the links between nodes
function linkArc(d) {
  const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
  // Calculate the radius `r` as the Euclidean distance between the source and target nodes
  return `
      M${d.source.x},${d.source.y} 
      A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
    `;
  // Move to the starting position at the coordinates of the source node
  // Draw an arc with radius `r` from the source node to the target node
  // The "A" command specifies an elliptical arc with parameters:
  // - x-radius, y-radius: r, r
  // - x-axis rotation: 0
  // - large-arc flag: 0 (use the smaller arc)
  // - sweep flag: 1 (arc is drawn clockwise)
  // - end point: target.x, target.y
}

//Handle dragging of nodes
const drag = simulation => {

  function dragstarted(event, d) { // Fixes node position when dragging starts so it doesn't move with the simulation
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) { // Updates node position when dragging
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0); // Stabilises the simulation
    d.fx = null; // Removes the fixed position and makes the node subject to the simulation
    d.fy = null;
  }

  return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
};

export default Graph;
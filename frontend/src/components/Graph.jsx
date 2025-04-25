import { useEffect, useRef } from 'react';
import { select, schemeCategory10, forceSimulation, forceLink, forceManyBody, forceX, forceY, scaleOrdinal, drag } from 'd3';
import { legendColor } from 'd3-svg-legend';

function Graph({ rawDocs, displayedDocs }) {
  const svgRef = useRef();
  let width = window.innerWidth;
  const height = width * 0.7;

  useEffect(() => {
    let docs = rawDocs || [];
    const types = Array.from(new Set(docs
      .flatMap(d => d[2])
      .filter(x => x !== undefined)
      .map(x => x.verb)
    ));
    const typeColorScale = scaleOrdinal(types, schemeCategory10);
    const nodes = docs.map(([id, title]) => ({id, title}));
    const links = docs.flatMap(d =>(d[2] || [])
      .filter(l => displayedDocs.includes(l.object.split('#')[0]))
      .map(l => ({
        source: d[0],
        type: l.verb,
        target: l.object.split('#')[0]
      }))
    );

    const simulation = forceSimulation(nodes)
      .force('link', forceLink(links).id(d => d.id))
      .force('charge', forceManyBody().strength(-500))
      .force('x', forceX(width / 2.5))
      .force('y', forceY(height / 2.5));

    const svgContainer = select(svgRef.current);
    const svg = svgContainer
      .append('svg')
      .attr('className', 'graph')
      .attr('viewBox', [0, 0 / 3, width, height])
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('style', 'font: 12px sans-serif;');

    svg.append('defs').selectAll('marker')
      .data(types)
      .join('marker')
      .attr('id', d => `arrow-${d}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 15)
      .attr('refY', -0.5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('fill', typeColorScale)
      .attr('d', 'M0,-5L10,0L0,5');

    const link = svg.append('g')
      .attr('fill', 'none')
      .attr('stroke-width', 1.5)
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('stroke', d => typeColorScale(d.type))
      .attr('marker-end', d => `url(${new URL(`#arrow-${d.type}`, window.location)})`);

    const node = svg.append('g')
      .attr('fill', 'currentColor')
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(setDraggable(simulation));

    node.append('circle')
      .attr('stroke', 'white')
      .attr('stroke-width', 1.5)
      .attr('r', 4);

    node.append('a')
      .attr('href', d => `../${d.id}`)
      .attr('style', 'text-decoration: none; color: black !important;')
      .append('text')
      .text(d => d.title)
      .attr('x', 8)
      .attr('y', '0.31em');

    svg.append('g')
      .attr('class', 'legendLinear');

    let legendLinear = legendColor()
      .shapeWidth(30)
      .orient('vertical')
      .scale(typeColorScale);
    svg.select('.legendLinear')
      .call(legendLinear);

    try {
      simulation.on('tick', () => {
        link.attr('d', drawLinkArc);
        node.attr('transform', d => `translate(${d.x},${d.y})`);
      });
    } catch (error) {
      simulation.stop();
      console.log(error);
    }

    return () => {
      svgContainer.selectAll('*').remove();
    };
  }, [displayedDocs, rawDocs, height, width]);

  if (!rawDocs) {
    return <div>Loading...</div>;
  }
  return (
    <div ref={svgRef} width="100%" height="100%">
    </div>
  );

}

function drawLinkArc(d) {
  const linkRadius = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
  return `
      M${d.source.x},${d.source.y} 
      A${linkRadius},${linkRadius} 0 0,1 ${d.target.x},${d.target.y}
    `;
  // See: https://developer.mozilla.org/docs/Web/SVG/Tutorial/Paths
}

const setDraggable = simulation => {

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
};

export default Graph;
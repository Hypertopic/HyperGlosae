import Graph from './Graph.jsx';

function GraphContainer({data}) {
  console.log('GraphContainer');
  console.log(data);
  // const content = data.rows;
  // console.log(content);
  //Get useful data from the content (doc's id, title and links)
  const docs = data
    .map((key) => [key._id, key.dc_title, key.links]);
    //Get the list of displayed documents
  const displayedDocs = docs.flatMap(d => d[0]);

  return <Graph docs={docs} displayedDocs={displayedDocs} />;
}

export default GraphContainer;
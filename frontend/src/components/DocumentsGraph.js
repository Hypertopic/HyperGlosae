function DocumentsCards({docs}) {

  let listRoots = [];

  let filteredDocs = docs.map((y => ({key: y?._id, title: y?.dc_title, author: y?.dc_creator, date: y?.dc_issued, isPartOf: y?.dc_isPartOf, links: y?.links?.map(z => z.object)})));

  filteredDocs.forEach(doc => {
    if (doc.links == undefined && doc.key != undefined) {
      listRoots.push(doc);
    }
  });

  listRoots = listRoots.map(doc =>
    <li key={doc.key}>
      <a href={doc.key}>
        <span className="work">{doc.title} ({doc.author}),</span>
        <span className="edition">
          {doc.isPartOf !== undefined && <><i>{doc.isPartOf}</i>, </>}
          {new Date(doc.date).getFullYear()}
        </span>
      </a>
    </li>
  );

  return (
    <>
      <ul>{listRoots}</ul>
    </>
  );
}

export default DocumentsCards;

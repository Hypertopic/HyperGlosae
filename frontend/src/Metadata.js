import './Metadata.css';

function Metadata({metadata}) {
  if (metadata) {
    let {dc_title, dc_creator, dc_translator, dc_isPartOf, dc_issued} = metadata;
    return (
      <>
        <span className="work">
          {dc_title} {dc_creator ? `(${dc_creator})` : ''},
        </span>
        <span className="edition">
          {dc_translator ? `Translated by ${dc_translator.join(' & ')}` : ''}
          {dc_isPartOf ? <i>{metadata.dc_isPartOf}</i> : ''}
          {dc_issued ? `, ${new Date(dc_issued).getFullYear()}` : ''}
        </span>
      </>
    );
  }
}

export default Metadata;

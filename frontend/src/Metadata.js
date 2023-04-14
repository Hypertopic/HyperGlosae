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
          {dc_translator ? `Translated by ${dc_translator.join(' & ')}, ` : ''}
          {dc_isPartOf ? <i>{metadata.dc_isPartOf}, </i> : ''}
          {dc_issued ? `${new Date(dc_issued).getFullYear()}` : ''}
        </span>
        , <License metadata={metadata} />
      </>
    );
  }
}

function License({metadata}) {
  let {dc_license} = metadata;
  let license = 'All rights reserved';
  if ( dc_license ) {
    const licenseList = ["by-nc-sa", "by-nc-nd", "by-sa", "by-nd", "by-nc", "by"];
    let licenseStocked = licenseList.find(license => dc_license.includes(license));
    if ( licenseStocked ) {
      license = licenseStocked;
    }
    return (
      <span className="license">
        {license}
      </span>
    );
  }
}

export default Metadata;

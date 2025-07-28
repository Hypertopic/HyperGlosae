import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function License({ license }) {
  if (license === 'Public domain') return (
    <div className="license">
      <span>Public domain</span>
    </div>
  );
  let license_uri = license;
  let [license_name] = /(BY[\w-]*)/i.exec(license_uri) || [];
  if (license_name) return (
    <div className="license">
      <OverlayTrigger overlay={<Tooltip>Consult license clauses</Tooltip>} >
        <a href={license_uri}>
          <img src= {`./license/cc.${license_name.toLowerCase()}.svg`} alt={`CC-${license_name.toUpperCase()}`} style={{height: '2em'}}/>
        </a>
      </OverlayTrigger>
    </div>
  );
  return (
    <span className="license">
      All rights reserved
    </span>
  );
}

export default License;
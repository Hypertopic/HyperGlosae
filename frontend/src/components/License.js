import React, { useState, useEffect } from 'react';

function License({ license }) {
  const [license_uri, setLicense_uri] = useState(null);

  useEffect(() => {
    if (license && license.dc_license) {
      setLicense_uri(license.dc_license);
    } else {
      setLicense_uri(null); // Explicitly set to null when no license is present
    }
  }, [license]);

  let license_name;
  if (license_uri) {
    const match = /BY[\w-]+/i.exec(license_uri);
    license_name = match ? match[0] : 'unknown';
  }

  if (!license) {
    return null; // Do not return anything if there is no license object
  }

  return (
    <div className="license">
      {license_uri ? (
        <a href={license_uri}>
          <img src={`./license/cc.${license_name.toLowerCase()}.svg`} alt={`CC-${license_name.toUpperCase()}`} style={{ height: '2em' }} />
        </a>
      ) : (
        <span>All rights reserved</span> // Only shown when there's no license URI
      )}
    </div>
  );
}

export default License;
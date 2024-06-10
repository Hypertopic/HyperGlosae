import React, { useEffect } from 'react';

const licenseCompatibility = {
  'Public domain': ['Public domain', 'by', 'by-sa', 'by-nc', 'by-nc-sa', 'by-nc-nd', 'by-nd', 'All rights reserved'],
  'by': ['by', 'by-sa', 'by-nc', 'by-nc-sa', 'by-nc-nd', 'by-nd', 'All rights reserved'],
  'by-sa': ['by-sa'],
  'by-nc': ['by-nc', 'by-nc-sa', 'by-nc-nd'],
  'by-nc-sa': ['by-nc-sa'],
  'by-nc-nd': [],
  'by-nd': [],
  'All rights reserved': ['All rights reserved'],
};

function LicenseCompatibility({ sourceMetadata, marginLicense }) {
  const sourceLicense = sourceMetadata?.dc_license;
  const isTranslation = sourceMetadata?.links && sourceMetadata?.links.some(link => link.verb === 'isTranslationOf');
  const getLicenseKey = (licenseUri) => {
    if (!licenseUri) return 'All rights reserved';
    if (licenseUri.toLowerCase() === 'public domain') return 'Public domain';
    const matches = /(BY[\w-]*)/i.exec(licenseUri);
    return matches ? matches[0].toLowerCase() : 'All rights reserved';
  };

  const sourceKey = getLicenseKey(sourceLicense);
  const marginKey = getLicenseKey(marginLicense);
  const isCompatible = isTranslation ? licenseCompatibility[sourceKey]?.includes(marginKey) : true;

  const warningStyle = {
    textAlign: 'right'
  };

  return (
    !isCompatible && (
      <div style={warningStyle} className="license-compatibility">
        <span className="not-compatible">Licenses are not compatible</span>
      </div>
    )
  );
}

export default LicenseCompatibility;

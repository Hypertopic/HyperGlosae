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

function LicenseCompatibility({ sourceMetadata, marginMetadata }) {
  const isAdaptation = marginMetadata?.links?.some(x => x.verb === 'adapts');

  const getLicenseKey = (licenseUri) => {
    if (!licenseUri) return 'All rights reserved';
    if (licenseUri.toLowerCase() === 'public domain') return 'Public domain';
    const matches = /BY[\w-]*/i.exec(licenseUri);
    return matches ? matches[0].toLowerCase() : 'All rights reserved';
  };

  const sourceKey = getLicenseKey(sourceMetadata?.dc_license);
  const marginKey = getLicenseKey(marginMetadata?.dc_license);
  const isCompatible = isAdaptation ? licenseCompatibility[sourceKey]?.includes(marginKey) : true;

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

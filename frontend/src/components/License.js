import React from 'react';
import { useTranslation } from 'react-i18next';

function License({ license }) {
  const { t } = useTranslation();
  let license_uri = license;

  let [license_name] = /BY[\w-]+/i.exec(license_uri) || [];
  if (license_name) return (
    <div className="license">
      <a href={license_uri}>
        <img src= {`./license/cc.${license_name.toLowerCase()}.svg`} alt={`CC-${license_name.toUpperCase()}`} style={{height: '2em'}}/>
      </a>
    </div>
  );
  return (
    <span className="license">
      {t('rights')}
    </span>
  );
}

export default License;
import { Link } from 'react-router-dom';
import { Bookmark, ChevronBarDown, ChevronExpand } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

function BrowseTools({id, closable, openable }) {
  const { t } = useTranslation();
  return (
    <>
      {closable &&
        <Link to="#" className="icon">
          <ChevronBarDown title={`${t('doc_close')}`} />
        </Link>
      }
      {openable &&
        <Link to={`#${id}`} className="icon open">
          <ChevronExpand title={`${t('doc_open')}`} />
        </Link>
      }
      <Link to={`../${id}`} className="icon focus">
        <Bookmark title={`${t('doc_focus')}`} />
      </Link>
    </>
  );
}

export default BrowseTools;

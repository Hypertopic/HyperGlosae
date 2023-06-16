import './CroppedImage.css';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function CroppedImage({ src, alt, title }) {

  const image = <img className="img-fluid rounded" {...{ src, alt }} />;
  const caption = <figcaption className="figure-caption text-end">{title}</figcaption>;

  let fragment = src.match(/#xywh=percent:([.\d]+),([.\d]+),([.\d]+),([.\d]+)/);
  if (fragment) {
    let [ , x, y, width, height ] = fragment;
    let crop = { unit: '%', x, y, width, height };
    return (
      <figure className="figure">
        <ReactCrop {...{ crop }} disabled={true}>
          {image}
        </ReactCrop>
        {caption}
      </figure>
    );
  }
  return (
    <figure className="figure">
      {image}
      {caption}
    </figure>
  );
}

export default CroppedImage;

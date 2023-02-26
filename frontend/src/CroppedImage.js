import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

function CroppedImage({src}) {
  let fragment = src.match(/#xywh=percent:([.\d]+),([.\d]+),([.\d]+),([.\d]+)/);
  if (fragment) {
    let [_, x, y, width, height] = fragment;
    let crop = {unit: '%', x, y, width, height};
    return (
      <ReactCrop {...{crop}} disabled={true} >
        <img {...{src}} />
      </ReactCrop>
    );
  }
  return (
    <img {...{src}} />
  );
}

export default CroppedImage;

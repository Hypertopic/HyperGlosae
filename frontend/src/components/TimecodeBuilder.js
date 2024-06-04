import React from 'react';
import { useEffect, useState } from 'react';

let status = 0;

function TimecodeBuilder({player, addComment}) {

  let [start, setStart] = useState('0');
  let [end, setEnd] = useState('0');

  useEffect(() => {
    if (player) {
      document.body.addEventListener('keydown', logKey);
      status = 0;
    }
  }, [player]);

  useEffect(() => {
    if (end != '0') {
      let texte = '\n' + start + ' --> ' + end + '\n\n<TEXT>\n';
      addComment(texte);
      resetTimecode();
    }
  }, [end]);

  const getPlayerTimecode = () => {
    if (player) {
      return player.getCurrentTime().toFixed(3).toString();
    }
    return 0;
  };

  let resetTimecode = () => {
    setStart('0');
    setEnd('0');
    status = 0;
  };

  let logKey = (event) => {
    if (!player.g) {
      return;
    }

    if ((event.code === 'Space' && event.ctrlKey)) {
      if (status == 0) {
        setStart(getTimecodeAsText());
        status = 1;

      } else if (status == 1) {
        setEnd(getTimecodeAsText());
      }
    }
  };

  let getTimecodeAsText = () => {
    let seconds = getPlayerTimecode();

    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remaningSeconds = Math.floor(seconds % 60);
    let centiseconds = Math.floor((seconds - Math.floor(seconds)) * 1000);

    let formattedHours = hours < 10 ? '0' + hours : hours;
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedSeconds = remaningSeconds < 10 ? '0' + remaningSeconds : remaningSeconds;
    let formattedCentiSecondes = centiseconds < 10 ? '00' + centiseconds : (centiseconds < 100 ? '0' + centiseconds : centiseconds);

    let timecode = formattedHours + ':' + formattedMinutes + ':' + formattedSeconds + '.' + formattedCentiSecondes;

    return timecode;
  };

  return (
    <div>
      { player && (start == 0 ? <div><p className="timecode-ready">[CTRL + SPACE] Appuyer pour marquer le début</p></div> : <div><p>{ start + ' --> [CTRL + SPACE] Appuyer pour marquer la fin' }</p><button onClick={ resetTimecode }>Réinitialiser</button></div>) }
    </div>
  );
}

export default TimecodeBuilder;

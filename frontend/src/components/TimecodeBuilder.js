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
      var texte = '\n' + start + ' --> ' + end + '\n\n<TEXT>\n';
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
    console.log(event);
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
    var secondes = getPlayerTimecode();

    var heures = Math.floor(secondes / 3600);
    var minutes = Math.floor((secondes % 3600) / 60);
    var secondesRestantes = Math.floor(secondes % 60);
    var centisecondes = Math.floor((secondes - Math.floor(secondes)) * 1000);

    var heuresFormate = heures < 10 ? '0' + heures : heures;
    var minutesFormate = minutes < 10 ? '0' + minutes : minutes;
    var secondesFormate = secondesRestantes < 10 ? '0' + secondesRestantes : secondesRestantes;
    var centisecondesFormate = centisecondes < 10 ? '00' + centisecondes : (centisecondes < 100 ? '0' + centisecondes : centisecondes);

    var timecode = heuresFormate + ':' + minutesFormate + ':' + secondesFormate + '.' + centisecondesFormate;

    return timecode;
  };

  return (
    <div>
      { start == 0 ? <div><p>[CTRL + SPACE] Appuyer pour marquer le début</p></div> : <div><p>{ start + ' --> [CTRL + SPACE] Appuyer pour marquer la fin' }</p><button onClick={ resetTimecode }>Réinitialiser</button></div> }
    </div>
  );
}

export default TimecodeBuilder;

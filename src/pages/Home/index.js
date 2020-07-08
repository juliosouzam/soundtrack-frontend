import React, { useCallback } from 'react';
import {
  MdPlayArrow,
  MdPauseCircleOutline,
  MdReplay10,
  MdForward10,
} from 'react-icons/md';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '../../services/api';

import {
  Container,
  Content,
  TrackList,
  PlayerWrapper,
  TextInfo,
} from './styles';

function Home() {
  const audioElementRef = React.useRef(null);
  const [tracks, setTracks] = React.useState([]);
  const [trackTime, setTrackTime] = React.useState('');
  const [trackTotalTime, setTrackTotalTime] = React.useState('');
  const [track, setTrack] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    api.get('/tracks').then((response) => {
      setTracks(response.data);
    });
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const audioPlayer = audioElementRef.current;
    const date = new Date();
    date.setMinutes(0);
    date.setSeconds(0);
    date.setSeconds(Math.floor(audioPlayer.currentTime));
    setTrackTime(
      format(date, "mm':'ss", {
        locale: ptBR,
      }),
    );
    date.setMinutes(0);
    date.setSeconds(0);
    date.setSeconds(Math.floor(audioPlayer.duration));

    setTrackTotalTime(
      format(date, "mm':'ss", {
        locale: ptBR,
      }),
    );
  }, []);

  React.useEffect(() => {
    const audioPlayer = audioElementRef.current;

    if (track) {
      if (isPlaying && audioPlayer.paused) {
        audioPlayer.play();
      }

      if (!isPlaying && !audioPlayer.paused) {
        audioPlayer.pause();
      }
    } else {
      setIsPlaying(true);
    }
  }, [isPlaying, track]);

  const handleToogleTrack = useCallback((trc) => {
    setIsPlaying((prevState) => !prevState);
    setTrack((prevState) => (prevState ? null : trc));
  }, []);

  const handleOnEnded = useCallback(() => {
    setIsPlaying(false);
    setTrack(null);
  }, []);

  const incrementTenSecs = useCallback(() => {
    const audioPlayer = audioElementRef.current;

    if (audioPlayer.currentTime + 10 >= audioPlayer.duration) {
      return null;
    }

    audioPlayer.currentTime += 10;

    return true;
  }, []);

  const decrementTenSecs = useCallback(() => {
    const audioPlayer = audioElementRef.current;

    if (audioPlayer.currentTime - 10 <= 0) {
      return null;
    }

    audioPlayer.currentTime -= 10;

    return true;
  }, []);

  return (
    <Container>
      <Content>
        {tracks.length <= 0 && <TextInfo>Nenhum registro encontrado</TextInfo>}
        <TrackList>
          {tracks.map((trc) => (
            <li key={trc._id}>
              {track && track._id === trc._id ? (
                <button type="button" onClick={() => handleToogleTrack(trc)}>
                  <MdPauseCircleOutline size={30} color="#fff" />
                </button>
              ) : (
                <button type="button" onClick={() => handleToogleTrack(trc)}>
                  <MdPlayArrow size={30} color="#fff" />
                </button>
              )}

              <div>
                <span>{trc.name}</span>
                <span>{trc.user.name}</span>
              </div>
            </li>
          ))}
        </TrackList>
      </Content>

      {track && (
        <PlayerWrapper>
          <audio
            ref={audioElementRef}
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleOnEnded}
            src={`http://localhost:3333/stream/${track._id}`}
          />
          <div>
            <button type="button" onClick={decrementTenSecs}>
              <MdReplay10 size={48} color="#fff" />
            </button>
            <span>
              {trackTime} / {trackTotalTime}
            </span>
            <button type="button" onClick={incrementTenSecs}>
              <MdForward10 size={48} color="#fff" />
            </button>
          </div>
        </PlayerWrapper>
      )}
    </Container>
  );
}

export default Home;

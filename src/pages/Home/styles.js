import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  flex: 1;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
`;

export const Title = styled.h1``;

export const TrackList = styled.ul`
  list-style: none;
  margin-top: 30px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  li {
    display: flex;
    align-items: center;
    padding: 5px;

    border: 1px solid #999;
    border-radius: 10px;

    button {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 8px;

      span {
        & + span {
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
`;

export const PlayerWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 150px;
  background: ${darken(0.1, '#312e38')};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      background: transparent;
      border: 0;
      padding: 10px;
    }
  }
`;

export const TextInfo = styled.p`
  font-size: 24px;
  margin: 50px auto 0;
`;

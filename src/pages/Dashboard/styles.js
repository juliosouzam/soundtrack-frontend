import styled, { css } from 'styled-components';
import { darken } from 'polished';

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: red;
`;

export const Container = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a {
    font-size: 18px;
    color: #fff;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${darken(0.2, '#fff')};
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1120px;
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  height: 200px;

  transition: height 0.2s ease;

  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragReject && dragReject};
`;

const messageColors = {
  default: '#999',
  error: '#e57878',
  success: '#78e5d5',
};

export const UploadMessage = styled.p`
  display: flex;
  color: ${(props) => messageColors[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

export const FileList = styled.ul`
  margin-top: 20px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ccc;

    & + li {
      margin-top: 15px;
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;

import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;

  display: flex;
  flex-direction: column;

  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;

  > div {
    flex: 1;

    display: flex;
    justify-content: center;

    a {
      color: #e5e3e8;
      text-decoration: none;
      margin: 10px 0;
      transition: color 0.2s ease;

      &:hover {
        color: ${darken(0.2, '#e5e3e8')};
      }
    }
  }
`;

export const FormTitle = styled.h1`
  margin: 0 auto 15px;
`;

export const Input = styled.input`
  height: 40px;
  border-radius: 5px;
  border: 0;
  padding: 10px;
  color: #333;

  & + input {
    margin-top: 10px;
  }

  &::placeholder {
    color: #999;
  }
`;

export const Button = styled.button`
  height: 46px;
  border: 0;
  border-radius: 5px;
  margin-top: 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s ease;

  &:hover {
    background: ${darken(0.3, '#fff')};
  }
`;

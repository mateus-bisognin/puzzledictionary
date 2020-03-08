import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  li {
    margin: 0px 20px 0px 20px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 500px;
    font-size: 16px;
    margin: auto;

    h2 {
      font-size: 28px;
      margin: 0px 20px 20px 20px;
    }

    h5 {
      align-self: flex-start;
      margin: 0;
      margin-left: 30px;
    }

    input {
      width: 300px;
      margin-left: 5px;
      margin-top: 20px;
      padding-left: 5px;
      border: 1px solid #000;
      border-radius: 4px;
      text-decoration: none;
      font-size: 20px;
    }

    span {
      color: red;
      font-size: 12px;
      height: 10px;
    }
  }
`;

export const Button = styled.button`
  color: LightSteelBlue;
  background-color: #fff;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid LightSteelBlue;
  border-radius: 3px;
  align-self: center;
  ${props =>
    props.disabled
      ? `
    cursor: not-allowed;
    animation: blink 1.5s linear infinite;
    @keyframes blink {
      50% {
        color: transparent;
      }
  }`
      : ``}
`;

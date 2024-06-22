import styled, { css } from "styled-components";

export const ButtonStyle = css`
  border: none;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  transition: all 0.3s ease;

  svg {
    height: 18px;
    margin-right: 6px;
  }

  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}

  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}

  ${(props) =>
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;
    `}

  ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}

  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}

  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: #4caf50;
      border: 1px solid #4caf50;
      color: #fff;
      width: fit-content; /* Add this line to reduce the width */
    `}

  ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid #4caf50;
      color: #4caf50;
    `}

  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}

  ${(props) =>
    props.size === "m" &&
    css`
      font-size: 0.9rem;
      padding: 8px 16px;
      svg {
        height: 18px;
      }
    `}

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
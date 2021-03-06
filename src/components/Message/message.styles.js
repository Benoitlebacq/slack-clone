import styled from "styled-components"

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem;

  > img {
    height: 3.125rem;
    border-radius: 8px;
  }

  > .MuiSvgIcon-root {
    height: 0px;
  }

  :hover {
    background-color: #f2f2f2;

    ${({ darkTheme }) =>
      darkTheme &&
      `
    background-color: #2e2e2e;;
    color: white;
  `}
    > .MuiSvgIcon-root {
      height: 1rem;
    }
  }
`
export const MessageInfo = styled.div`
  padding-left: 0.8rem;
  flex: 1;

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 0.25rem;
    font-size: 0.6rem;
  }

  > form > input {
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 1.125rem;
    outline: none;
    ${({ darkTheme }) =>
      darkTheme &&
      `
    background-color: #323232;
    color: white;
    border: 1px solid lightgray;
    ::placeholder {
      color: lightgray
    }
  `}
  }

  > form > button {
    display: none;
  }
`

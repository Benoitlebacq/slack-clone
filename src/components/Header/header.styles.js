import styled from "styled-components"
import { Avatar } from "@material-ui/core"

export const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 0;
  background-color: var(--slack-color);
  color: whitesmoke;
  ${({ darkTheme }) =>
    darkTheme &&
    `
    background-color: #212121;
    color: white;
  `}
`
export const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 1.25rem;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 1.875rem;
  }
  > img {
    height: 2.5rem;
    border-radius: 8px;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }
`
export const Headersearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0 3.125rem;
  color: gray;
  border: 1px solid gray;
  ${({ darkTheme }) =>
    darkTheme &&
    `
    background-color: #212121;
    color: white;
  `}

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
  }
`
export const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 1.875rem;
  }
`

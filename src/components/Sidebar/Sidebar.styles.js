import styled from "styled-components"

export const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 16.25rem;
  margin-top: 3.75rem;

  ${({ darkTheme }) =>
    darkTheme &&
    `
    background-color: #212121;
    color: white;
    border-top: 1px solid dimgray;
  `}

  > hr {
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
    border: 1px solid #49274b;

    ${({ darkTheme }) =>
      darkTheme &&
      `
    border: 1px solid dimgray;
  `}
  }
`
export const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 0.8125rem;
  ${({ darkTheme }) =>
    darkTheme &&
    `
    border-bottom: 1px solid dimgray;
  `}

  > .MuiSvgIcon-root {
    padding: 0.5rem;
    color: #49274b;
    font-size: 1.125rem;
    background-color: white;
    border-radius: 50%;
    :hover {
      cursor: pointer;
    }
  }
`
export const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 0.9rem;
    font-weight: 900;
    margin-bottom: 0.3125rem;
  }

  > h3 {
    display: flex;
    font-size: 0.8125rem;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 0.875rem;
    margin-top: 0.0625rem;
    margin-bottom: 0.125rem;
    color: green;
  }
`

export const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 0.75rem;
  align-items: center;
  padding-left: 0.125rem;

  :hover {
    opacity: 0.8;
    background-color: #340e36;
    ${({ darkTheme }) =>
      darkTheme &&
      `
      opacity: 1;
      background-color: #3A3B3C;
  `}
  }

  > h3 {
    font-weight: 500;
    display: flex;
    align-items: center;
  }

  > h3 > span {
    padding-left: 0.95rem;
  }
  > h3 > span > .MuiSvgIcon-root {
    margin-left: -0.3rem;
    margin-right: 0.6rem;
  }
`

export const SidebarOptionChannel = styled.h3`
  padding: 0.625rem 0;
  font-weight: 300;

  > .MuiSvgIcon-root {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`
export const Hashtag = styled.div`
  margin-left: 0.95rem;
  margin-right: 0.95rem;
`

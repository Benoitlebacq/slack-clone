import styled from "styled-components"

export const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 3.75rem;
  ${({ darkTheme }) =>
    darkTheme &&
    `
    background-color: #323232;
    color: white;
  `}
`
export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.27rem;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid lightgray;
  ${({ darkTheme }) =>
    darkTheme &&
    `
      border-bottom: 1px solid dimgray;
  border-top: 1px solid dimgray;
  `}
`

export const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 0.625rem;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 0.625rem;
    font-size: 1.125rem;
  }
  > p {
    font-size: 0.8rem;
    color: gray;
  }
`
export const ChatHeaderRight = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;

  > .MuiSvgIcon-root {
    cursor: pointer;
  }
`
export const ChatMessages = styled.div``

export const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 1.875rem;
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
export const ChatBottom = styled.div`
  padding-bottom: 10.5rem;
`
export const NumberOfPeopleInChat = styled.div`
  margin-right: 1.25rem;
`
export const PublicChannel = styled.div`
  margin-right: 0.625rem;
`

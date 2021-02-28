import styled from "styled-components"

export const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 3.75rem;
`
export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.25rem;
  border-bottom: 1px solid lightgray;
`

export const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 0.625rem;
  }

  > h4 > .muiSvgIcon-root {
    margin-left: 0.625rem;
    font-size: 1.125rem;
  }
`
export const ChatHeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
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
  }

  > form > button {
    display: none;
  }
`
export const ChatBottom = styled.div`
  padding-bottom: 12.5rem;
`

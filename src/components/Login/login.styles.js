import styled from "styled-components"

export const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`

export const LoginInnerContainer = styled.div`
  padding: 6.25rem;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 6.25rem;
    margin-bottom: 2.5rem;
  }

  > button {
    margin-top: 3.125rem;
    text-transform: inherit !important;
    background-color: #d50000 !important;
    color: white;
    font-weight: 900;
  }
`

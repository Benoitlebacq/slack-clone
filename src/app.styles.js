import styled from "styled-components"

export const AppBody = styled.div`
  display: flex;
  height: 100vh;
`
export const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 6.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 6.5rem;
    padding: 1.25rem;
    margin-bottom: 2.5rem;
  }
`

export const AppLoadingContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`

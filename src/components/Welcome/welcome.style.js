import styled from "styled-components"

export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;

  > img {
    height: 10rem;
    width: 10rem;

    animation-name: spin;
    animation-duration: 200ms;
    animation-iteration-count: 1s;
    animation-timing-function: linear;
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  > p {
    margin-top: 1.125rem;
  }
`
export const WelcomeTitle = styled.h1`
  margin-top: 2.5rem;
`

import styled from "styled-components"

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem;

  > img {
    height: 3.125rem;
    border-radius: 50%;
  }
`
export const MessageInfo = styled.div`
  padding-left: 0.8rem;

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 0.25rem;
    font-size: 0.6rem;
  }
`

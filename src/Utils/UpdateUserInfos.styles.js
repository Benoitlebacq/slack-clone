import styled from "styled-components"

export const ModalContainer = styled.div`
  height: 100%;
  width: 100%;
  > .MuiInput-root {
    margin-top: 1.25rem;
    position: relative;
    padding: 1.125rem;
  }
`

export const ModalHeader = styled.div`
  padding: 0.625rem;
  color: white;

  > h3 {
    margin-bottom: 0.625rem;
  }
`
export const ModalInputsContainer = styled.div`
  padding: 0.625rem;

  > .MuiGrid-root {
    margin-bottom: 0.625rem;
    color: white;
  }

  > .MuiInput-root {
    position: relative;
    top: 3.125rem;
  }
`

export const GridContainer = styled.div`
  display: flex;
  justify-content: space-between;

  > .MuiGrid-root {
    margin-bottom: 3.125rem;
    margin-bottom: 0.625rem;
    color: white;
  }
`

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.125rem;

  > progress {
    height: 2rem;
  }

  > .MuiInput-root {
    position: relative;
  }

  > .MuiButton-root {
    margin-top: 0.625rem;
    width: 1.125rem;
    position: relative;
  }
`

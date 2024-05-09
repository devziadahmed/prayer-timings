import styled from "styled-components";

const StyledError = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-direction: column;

  & div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  & p {
    padding: 1rem;
    font-weight: 700;
    color: #ff4c4c;
  }

  & p:last-child {
    font-size: 1.4rem;
  }

  & button {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    outline: 0;
    border: 0;
    cursor: pointer;
    background-color: #279b37;
    color: white;
  }
`;

function Error({ errorMessage, reload = true }: { errorMessage: string; reload?: boolean }) {
  return (
    <StyledError>
      <div>
        <p>{errorMessage}</p>
        {reload && <button onClick={() => window.location.reload()}>Reload</button>}
      </div>
      <p>Note: the timing API currently in use sometimes fails in some countries.</p>
    </StyledError>
  );
}

export default Error;

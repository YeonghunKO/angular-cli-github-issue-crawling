import styled from "@emotion/styled";
const Spinner = () => {
  return (
    <SpinnerContainer>
      {" "}
      <Circle />{" "}
    </SpinnerContainer>
  );
};
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  margin-top: 1em;
`;
const Circle = styled.div`
  width: 70px;
  height: 70px;
  border: 10px solid #32967f;
  border-top: 10px solid #fafafa;
  border-radius: 50%;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Spinner;

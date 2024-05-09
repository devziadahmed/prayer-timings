import styled, { keyframes } from "styled-components";

interface SpinnerProps {
  size: string;
  color: string;
  as?: string;
}

const rotate = keyframes`
        100% {
      transform: rotate(360deg);
    }
  `;

const StyledSpinner = styled.div<SpinnerProps>`
  display: block;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  border: 4px solid #ccc;
  border-top: 4px solid ${(props) => props.color};
  animation: ${rotate} 1s linear infinite;
`;

function Spinner({ size, color, as = "div" }: SpinnerProps) {
  return <StyledSpinner size={size} color={color} as={as} />;
}

export default Spinner;

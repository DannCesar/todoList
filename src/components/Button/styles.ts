import styled from "styled-components";
interface ButtonContainerProps{
    color?: string
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  padding: 4px;
  border-radius: 4px;
  font-size: 10px;
  color: #ffff;
  font-weight: 600;
  background-color: ${(props) => props.color || "00000"};
  display: flex;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  gap: 4px;
  border: 2px solid ${(props) => props.color || "00000"};
  

  & img {
    width: 16px;
    height: 16px;
  }
`;

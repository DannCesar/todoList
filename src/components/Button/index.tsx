import React, { ButtonHTMLAttributes } from "react";
import * as S from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    label: string;
    onClick: (event:React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC <ButtonProps> = ({label,onClick}) => {
  return (
    <S.ButtonContainer onClick={onClick}>
      <label>{label}</label>
    </S.ButtonContainer>
  );
}

import React, { ButtonHTMLAttributes } from "react";
import * as S from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: string;
  color?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  color,
  onClick,
}) => {
  return (
    <S.ButtonContainer color={color} onClick={onClick}>
      {icon && <img src={icon} alt="icone" />}

      <label>{label}</label>
    </S.ButtonContainer>
  );
};

import styled from "styled-components";

interface ListContainerProps {
  active: boolean;
}

interface UlContainerProps {
  active: boolean;
}

export const GeralContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: auto;

  & h1 {
    display: flex;
    justify-content: center;
    color: #fff;
  }
`;

export const TodoContainer = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 8px;
  width: 600px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  height: 100px;
  background-color: white;

  & input {
    border-radius: 4px;
    padding: 4px;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  width: auto;
  height: fit-content;
  gap: 8px;
`;
export const UlContainer = styled.ul<UlContainerProps>`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${(props) => (props.active ?  `#8e8e8e`:`none`)};
  width: 580px;
  border-radius: 4px;
  padding: 8px;
 
`;

export const GeralListContainer = styled.div`
display: flex;
flex-direction: column;

& hr{
  margin-top: 1%;
}

`

export const ListContainer = styled.li<ListContainerProps>`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  gap: 4px;

  & input {
    border-radius: 4px;
    padding: 4px;
  }
  & span {
    text-decoration: ${(props) => (props.active ? `line-through` : `none`)};
    margin-left: 10%;
  }
`;

export const TodoButtonContainer = styled.div`
  display: flex;
  gap: 4px;
`;

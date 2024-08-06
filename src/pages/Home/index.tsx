import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import * as S from "./styles";
import checkIcon from "../../assets/check.svg";
import trashIcon from "../../assets/trash.svg";
import pencilIcon from "../../assets/pencil.svg";
import floppyDiscIcon from "../../assets/floppyDisk.svg";

interface TodoProps {
  task: string;
  active: boolean;
}

export default function Home() {
  const [listTodo, setListTodo] = useState<TodoProps[]>([]);
  const [todo, setTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [editedTodoValue, setEditedTodoValue] = useState("");

  useEffect(() => {
    const savedTodo = localStorage.getItem("listTodo");
    if (savedTodo) {
      setListTodo(JSON.parse(savedTodo));
    }
  }, []);

  function updatedLocalStorage(updatedList: TodoProps[]) {
    localStorage.setItem("listTodo", JSON.stringify(updatedList));
  }

  function createTodo() {
    if (!todo.trim()) {
      alert(
        "Sua tarefa precisa de um nome,nomeie sua tarefa para adicionar à lista."
      );
      return;
    }
    const updatedTodoList = [...listTodo, { task: todo, active: false }];
    setListTodo(updatedTodoList);
    updatedLocalStorage(updatedTodoList);
    setTodo("");
  }

  function deleteTodo(removeItem: string) {
    const removedTodo = listTodo.filter((todos) => todos.task !== removeItem);
    setListTodo(removedTodo);
    updatedLocalStorage(removedTodo);
  }

  function todoDone(doneTodo: string) {
    const updatedDoneTodo = listTodo.map((todos) =>
      todos.task === doneTodo ? { ...todos, active: !todos.active } : todos
    );
    setListTodo(updatedDoneTodo);
    updatedLocalStorage(updatedDoneTodo);
  }
  function editTodo(todo: string) {
    setEditingTodo(todo);
    setEditedTodoValue(todo);
  }

  function updateTodo() {
    if (!editedTodoValue.trim()) {
      alert("Sua tarefa precisa de um nome");
      return;
    }
    const updatedTodo = listTodo.map((todos) =>
      todos.task === editingTodo ? { ...todos, task: editedTodoValue } : todos
    );
    if (editingTodo) {
      setListTodo(updatedTodo);
      updatedLocalStorage(updatedTodo);
      setEditingTodo(null);
      setEditedTodoValue("");
    }
  }

  return (
    <>
      <S.GeralContainer>
        <h1>TodoList</h1>
        <S.TodoContainer>
          <S.ButtonContainer>
            <input
              id="todo"
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <Button
              label="Adicionar tarefa"
              onClick={createTodo}
              color="#708090"
            />
          </S.ButtonContainer>
        </S.TodoContainer>
        <S.UlContainer active={listTodo.length !== 0}>
          {listTodo.length > 0 && (
            <ul>
              {listTodo.map((todos, index) => (
                <S.GeralListContainer key={index}>
                  <S.ListContainer active={todos.active}>
                    {editingTodo === todos.task ? (
                      <input
                        value={editedTodoValue}
                        onChange={(e) => setEditedTodoValue(e.target.value)}
                      />
                    ) : (
                      <span>{todos.task} </span>
                    )}

                    <S.TodoButtonContainer>
                      <Button
                        onClick={() => todoDone(todos.task)}
                        icon={checkIcon}
                        label="Concluído"
                        color="#2ca05e"
                      />
                      <Button
                        onClick={() => deleteTodo(todos.task)}
                        icon={trashIcon}
                        label="Deletar"
                        color="#f85757"
                      />
                      {editingTodo === todos.task ? (
                        <Button
                          icon={floppyDiscIcon}
                          label="Salvar"
                          onClick={updateTodo}
                          color="#708090"
                        />
                      ) : (
                        <Button
                          onClick={() => editTodo(todos.task)}
                          icon={pencilIcon}
                          label="Editar"
                          color="#708090"
                        />
                      )}
                    </S.TodoButtonContainer>
                  </S.ListContainer>
                  {listTodo.length > 1 && <hr />}
                </S.GeralListContainer>
              ))}
            </ul>
          )}
        </S.UlContainer>
      </S.GeralContainer>
    </>
  );
}

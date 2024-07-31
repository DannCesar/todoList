import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import * as S from "./styles";

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

  useEffect(() => {
    console.log("Atualizando",listTodo)
    localStorage.setItem("listTodo", JSON.stringify(listTodo));
  }, [listTodo]);

  function createTodo() {
    if (!todo.trim()) {
      alert(
        "Sua tarefa precisa de um nome,nomeie sua tarefa para adicionar à lista."
      );
      return;
    }
    setListTodo([...listTodo, { task: todo, active: false }]);
    setTodo("");
  }

  function deleteTodo(removeItem: string) {
    const removedTodo = listTodo.filter((todos) => todos.task !== removeItem);
    setListTodo(removedTodo);
  }

  function todoDone(doneTodo: string) {
    setListTodo(
      listTodo.map((todos) =>
        todos.task === doneTodo ? { ...todos, active: true } : todos
      )
    );
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

    if (editingTodo) {
      setListTodo(
        listTodo.map((todos) =>
          todos.task === editingTodo
            ? { ...todos, task: editedTodoValue }
            : todos
        )
      );
      setEditingTodo(null);
      setEditedTodoValue("");
    }
  }
console.log(listTodo,"list")
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
            <Button label="Adicionar" onClick={createTodo} />
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
                        label="Concluido"
                      />
                      <Button
                        onClick={() => deleteTodo(todos.task)}
                        label="Deletar"
                      />
                      <Button
                        onClick={() => editTodo(todos.task)}
                        label="Editar"
                      />
                      {editingTodo && (
                        <Button label="Salvar" onClick={updateTodo} />
                      )}
                    </S.TodoButtonContainer>
                  </S.ListContainer>
                  <hr />
                </S.GeralListContainer>
              ))}
            </ul>
          )}
        </S.UlContainer>
      </S.GeralContainer>
    </>
  );
}

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { TaskTree } from "./components/TaskTree";
import { taskStore } from "./store/taskStore";

// Основной контейнер с фоном
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Основной контейнер приложения с белым фоном и тенями
const TodoApp = styled.div`
  width: 100%;
  max-width: 540px;
  background: #fff;
  margin-top: 40px;
  padding: 40px 30px 70px;
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

// Заголовок приложения
const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
`;

// Строка ввода для новой задачи
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f7f8fa;
  border-radius: 30px;
  margin-bottom: 25px;
  padding: 10px;
`;

// Поле ввода с декоративным padding
const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 25px;
  transition: all 0.3s ease;
  &:focus {
    background: #e9e9e9;
  }
`;

// Кнопка для добавления задачи
const Button = styled.button`
  border: none;
  outline: none;
  padding: 12px 30px;
  background: #ff5945;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.3s ease;

  &:hover {
    background: #ff3d2d;
  }
`;

// Контейнер для списка задач
const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Стиль для каждой задачи
const TaskTreeStyled = styled.li<{ level: number }>`
  background: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: ${({ level }) =>
    level * 20}px; /* Увеличиваем отступы для подзадач */

  &:hover {
    background: #f7f8fa;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const App: React.FC = observer(() => {
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = () => {
    if (taskInput) {
      taskStore.addTask(taskInput);
      setTaskInput("");
    } else {
      alert("Введите название задачи!");
    }
  };

  return (
    <Container>
      <TodoApp>
        <Title>Задачи</Title>
        <Row>
          <Input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Добавить задачу"
          />
          <Button onClick={handleAddTask}>+</Button>
        </Row>
        <ListContainer>
          {taskStore.tasks.map((task) => (
            <TaskTreeStyled key={task.id} level={0}>
              <TaskTree task={task} level={0} />
            </TaskTreeStyled>
          ))}
        </ListContainer>
      </TodoApp>
    </Container>
  );
});

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { TaskTree } from "./components/TaskTree";
import { taskStore } from "./store/taskStore";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
  padding: 10px;
`;

const TodoApp = styled.div`
  width: 100%;
  max-width: 540px;
  background: #fff;
  margin: 100px auto 20px;
  padding: 40px 30px 70px;
  border-radius: 10px;
`;

const Title = styled.h2`
  color: #002765;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #edeef0;
  border-radius: 30px;
  margin-bottom: 25px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 10px;
  font-size: 16px;
  padding-left: 25px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  padding: 16px 50px;
  background: #ff5945;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 40px;
`;

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SelectTask = styled.select`
  padding: 12px 20px;
  margin-right: 10px;
  border: 2px solid #ff5945;
  border-radius: 30px;
  background-color: #fff;
  color: #555;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #71b7e6;
    box-shadow: 0 0 10px rgba(113, 183, 230, 0.5);
    outline: none;
  }

  option {
    padding: 10px;
    background-color: #f7f7f7;
  }

  option:hover {
    background-color: #ff5945;
    color: white;
  }
`;

export const App: React.FC = observer(() => {
  const [taskInput, setTaskInput] = useState("");
  const [subTaskInput, setSubTaskInput] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleAddTask = () => {
    if (taskInput) {
      taskStore.addTask(taskInput);
      setTaskInput("");
    } else {
      alert("Введите название задачи!");
    }
  };

  const handleAddSubTask = () => {
    if (selectedTaskId === null || subTaskInput.trim() === "") {
      alert("Выберите задачу и введите название подзадачи!");
      return;
    }

    try {
      taskStore.addSubTask(selectedTaskId, subTaskInput);
      setSubTaskInput("");
    } catch (error) {
      console.error(error);
      alert("Ошибка при добавлении подзадачи!");
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
        <Row>
          <SelectTask
            value={selectedTaskId || ""}
            onChange={(e) => setSelectedTaskId(e.target.value)}
          >
            <option value="">Выберите задачу</option>
            {taskStore.tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </SelectTask>
          <Input
            type="text"
            value={subTaskInput}
            onChange={(e) => setSubTaskInput(e.target.value)}
            placeholder="Добавить подзадачу"
          />
          <Button onClick={handleAddSubTask}>+</Button>
        </Row>
        <ListContainer>
          {taskStore.tasks.map((task) => (
            <TaskTree key={task.id} task={task} level={0} />
          ))}
        </ListContainer>
      </TodoApp>
    </Container>
  );
});

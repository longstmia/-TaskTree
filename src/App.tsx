import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { TaskTree } from "./components/TaskTree";
import { taskStore } from "./store/taskStore";
import {
  Container,
  TodoApp,
  Row,
  Input,
  Button,
  ListContainer,
  TaskTreeStyled,
} from "./App.styled";

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

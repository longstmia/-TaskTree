import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { taskStore, Task } from "../store/taskStore";

const TaskContainer = styled.div<{ level: number }>`
  margin-left: ${(props) => props.level * 20}px;
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const SubTaskList = styled.div`
  margin-left: 20px;
`;

const ToggleButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #71b7e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff5945;
  }
`;

const AddSubTaskButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

interface TaskTreeProps {
  task: Task;
  level: number;
}

export const TaskTree: React.FC<TaskTreeProps> = observer(({ task, level }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Состояние для раскрытия/сворачивания подзадач

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    taskStore.toggleTask(task, isChecked);

    if (level > 0) {
      const parentTask = taskStore.findParentTask(task.id);
      if (parentTask) {
        taskStore.updateParentTaskStatus(parentTask);
      }
    }
  };

  const toggleSubTasks = () => {
    setIsExpanded(!isExpanded); // Переключаем состояние раскрытия подзадач
  };

  const handleAddSubTask = () => {
    const subTaskTitle = prompt("Введите название подзадачи:");
    if (subTaskTitle) {
      taskStore.addSubTask(task.id, subTaskTitle);
    }
  };

  return (
    <>
      <TaskContainer level={level}>
        <Checkbox
          type="checkbox"
          checked={task.isChecked}
          onChange={handleCheckboxChange}
        />
        <span>{task.title}</span>
        {task.subTasks.length > 0 && (
          <ToggleButton onClick={toggleSubTasks}>
            {isExpanded ? "Свернуть" : "Развернуть"}
          </ToggleButton>
        )}
        <AddSubTaskButton onClick={handleAddSubTask}>
          Добавить подзадачу
        </AddSubTaskButton>
      </TaskContainer>

      {/* Если подзадачи развернуты, отображаем их */}
      {isExpanded && task.subTasks.length > 0 && (
        <SubTaskList>
          {task.subTasks.map((subTask) => (
            <TaskTree key={subTask.id} task={subTask} level={level + 1} />
          ))}
        </SubTaskList>
      )}
    </>
  );
});

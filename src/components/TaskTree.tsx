import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { taskStore, Task } from "../store/taskStore";
import {
  TaskContainer,
  Checkbox,
  SubTaskList,
  Arrow,
  AddSubTaskButton,
} from "./TaskTree.style";

interface TaskTreeProps {
  task: Task;
  level: number;
}

export const TaskTree: React.FC<TaskTreeProps> = observer(({ task, level }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
    setIsExpanded(!isExpanded);
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
        {task.subTasks.length > 0 && (
          <Arrow onClick={toggleSubTasks} isExpanded={isExpanded}>
            ▶
          </Arrow>
        )}
        <Checkbox
          type="checkbox"
          checked={task.isChecked}
          onChange={handleCheckboxChange}
        />
        <span>{task.title}</span>
        <AddSubTaskButton onClick={handleAddSubTask}>
          Добавить подзадачу
        </AddSubTaskButton>
      </TaskContainer>
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

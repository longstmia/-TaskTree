import React from "react";
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

interface TaskTreeProps {
  task: Task;
  level: number;
}

export const TaskTree: React.FC<TaskTreeProps> = observer(({ task, level }) => {
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

  return (
    <>
      <TaskContainer level={level}>
        <Checkbox
          type="checkbox"
          checked={task.isChecked}
          onChange={handleCheckboxChange}
        />
        <span>{task.title}</span>
      </TaskContainer>
      {task.subTasks.length > 0 && (
        <SubTaskList>
          {task.subTasks.map((subTask) => (
            <TaskTree key={subTask.id} task={subTask} level={level + 1} />
          ))}
        </SubTaskList>
      )}
    </>
  );
});

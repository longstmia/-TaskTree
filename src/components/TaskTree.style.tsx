import styled from "styled-components";
export const TaskContainer = styled.div<{ level: number }>`
  margin-left: ${(props) => props.level * 20}px;
  display: flex;
  padding: 5px;
  align-items: center;
`;

export const Checkbox = styled.input`
  margin-right: 8px;
`;

export const SubTaskList = styled.div`
  margin-left: 20px;
`;

export const Arrow = styled.span`
  cursor: pointer;
  margin-right: 8px;
  font-size: 15px;
  transition: transform 0.2s ease;
  transform: ${(props: { isExpanded: boolean }) =>
    props.isExpanded ? "rotate(90deg)" : "rotate(0deg)"};
`;

export const AddSubTaskButton = styled.button`
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

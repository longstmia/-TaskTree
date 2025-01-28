import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TodoApp = styled.div`
  width: 100%;
  max-width: 1000px;
  background: #fff;
  margin-top: 40px;
  padding: 40px 30px 70px;
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f7f8fa;
  border-radius: 30px;
  margin-bottom: 25px;
  padding: 10px;
`;

export const Input = styled.input`
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

export const Button = styled.button`
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

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const TaskTreeStyled = styled.li<{ level: number }>`
  background: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 85px;

  &:hover {
    background: #f7f8fa;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
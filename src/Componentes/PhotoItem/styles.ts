import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #3d3f43;
  border-radius: 10px;
  padding: 10px;

  img {
    width: 100%;
    height: 90%;
    display: block;
    margin-bottom: 10px;
    border-radius: 10px;
  }
`;

export const Deletebutton = styled.button`
  display: block;
  background-color: #ff4040;
  border: 0;
  color: #fff;
  padding: 6px 10px;
  font-size: 12px;
  border-radius: 10px;
  margin-left: 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const ContentButton = styled.div`
  display: flex;
  justify-content: center;
`;

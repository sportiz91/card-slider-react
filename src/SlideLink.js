import styled from "styled-components";

/*
  ALTERNATIVE FOR BACKGROUND:
    background: ${(props) => (props.isActive ? "blue" : "red")};
    You can even call the props as you want:
      background: ${(santi) => (santi.isActive ? "blue" : "red")};
*/
const SlideLink = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: 4rem;

  background: ${({ isActive }) => (isActive ? "blue" : "red")};
  color: white;
`;

export default SlideLink;

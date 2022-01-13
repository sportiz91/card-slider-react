import styled from "styled-components";

const SlideLink = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: 4rem;

  background: ${(props) => (props.isActive ? "blue" : "red")};
  color: white;
`;

export default SlideLink;

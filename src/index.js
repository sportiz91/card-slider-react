//This example is based on: https://codesandbox.io/s/dark-field-g78zb?fontsize=14&hidenavigation=1&theme=dark&file=/src/Wrapper.jsx:0-223
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import BlogPostCardSlider from "./BlogPostCardSlider";
import BlogPostCard from "./BlogPostCard";

function App() {
  return (
    <div className="App">
      <BlogPostCardSlider>
        <BlogPostCard>My blog post title</BlogPostCard>
        <BlogPostCard>My blog post title</BlogPostCard>
        <BlogPostCard>My blog post title</BlogPostCard>
        <BlogPostCard>My blog post title</BlogPostCard>
      </BlogPostCardSlider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

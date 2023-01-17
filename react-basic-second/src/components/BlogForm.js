import axios from "axios";
import { useState } from "react";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const onSubmit = () => {
    axios.post("http://localhost:3001/posts", {
      title,
      body,
    });
  };
  return (
    <div className="container">
      <h1>Create a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          // onChange 이벤트는 입력되는 대로 함수 실행한다는 의미이다.
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea
          className="form-control"
          value={body}
          rows={10}
          // onChange 이벤트는 입력되는 대로 함수 실행한다는 의미이다.
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
      </div>
      <button className="btn btn-primary" onClick={onSubmit}>
        Post
      </button>
    </div>
  );
};

export default BlogForm;

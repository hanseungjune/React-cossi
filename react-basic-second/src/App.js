import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  // input에 값이 기입되고 지워질 때, title에 입력값이 저장된다.
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const onSubmit = () => {
    axios.post("http://localhost:3001/posts", {
      title,
      body,
    });
  };

  return (
    <Router>
      <nav class="navbar navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            Home
          </Link>
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/blogs">
                Blogs
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path="/" exact>
          Home Page
        </Route>
        <Route path="/blogs" exact>
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
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
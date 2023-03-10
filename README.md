# ๐๋ฆฌ์กํธ์ ๋ํ ๊ธฐ์ด์ ์ธ ์ค๋ช

## useState(1)

```js
// useState ๊ด๋ จ ๊ธฐ์ด ์ค๋ช

import { useState } from 'react'

const App = () => {
  // useState๋ฅผ ์จ์, number์ ๊ฐ์ ์ ์ฅํ๊ณ , setNumber()๋ฅผ ํตํด์ ๊ฐ์ ์์ ํ๋ค.
  // ๋ฆฌ์กํธ์์๋ ๊ฐ์ ๋ณ๊ฒฝํ ๋, ์ผ๋ฐ์ ์ผ๋ก ๋ชป๋ฐ๊พธ๊ณ  useState๋ฅผ ์จ์ผํจ
  const [number, setNumber] = useState(1);
  const double = () => {
    const doubledNumber = number * 2
    // ๊ฐ ์์ 
    setNumber(doubledNumber)
    console.log(doubledNumber)
  }

  return ( 
    <>
      <div>{number}</div>
      <button onClick={double}>Submit</button> 
    </>
  );
}

export default App;
```

## useState(2), prevState

```js
import { useState } from 'react'

const App = () => {
  const [number, setNumber] = useState(1);
  const double = () => {
    // prevNumber๋ number ์ด๊ธฐ๊ฐ์ธ 1์ด๋ค.
    // return ํ๋ฉด์ number์ ๊ฐ์ด ์์ ๋๊ณ , ์ ์ฅ๋๋ค.
    setNumber((prevNumber) => prevNumber * 2)  // number => 2
    setNumber((prevNumber) => prevNumber * 2)  // number => 4
    // ๊ณ ๋ก 4์ฉ ๊ณฑํด์ง๋ค.
  }

  return ( 
    <>
      <div>{number}</div>
      <button onClick={double}>Submit</button> 
    </>
  );
}

export default App;
```

## useState(3), onChange(input.tag)

```js
import { useState } from 'react';

const App = () => {
  // input์ ๊ฐ์ด ๊ธฐ์๋๊ณ  ์ง์์ง ๋, title์ ์๋ ฅ๊ฐ์ด ์ ์ฅ๋๋ค.
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  // onClick eventHandler
  const onSubmit = () => {
    console.log(title, body)
  }

  return ( 
    <div className="container">
      <div className="mb-3">
        <label className='form-label'>Title</label>
        <input
          className="form-control"
          value={title}
          // onChange ์ด๋ฒคํธ๋ ์๋ ฅ๋๋ ๋๋ก ํจ์ ์คํํ๋ค๋ ์๋ฏธ์ด๋ค.
          onChange={(event) => {
            setTitle(event.target.value)
          }}
        />
      </div>
      <div className="mb-3">
        <label className='form-label'>Body</label>
        <textarea
          className="form-control"
          value={body}
          rows={10}
          // onChange ์ด๋ฒคํธ๋ ์๋ ฅ๋๋ ๋๋ก ํจ์ ์คํํ๋ค๋ ์๋ฏธ์ด๋ค.
          onChange={(event) => {
            setBody(event.target.value)
          }}
        />
      </div>
      <button 
        className="btn btn-primary"
        onClick={onSubmit} //๊ทธ๋ฅ onClick ์ด๋ฒคํธํธ๋ค๋ฌ์
      >Post</button>
    </div>
  );
}

export default App;
```

## json-server ์ค์น ๋ฐ ์ ์ฅ

```bash
### json-server ์ค์น
npm install -g json-server
### json-server ์์(db.json์ด DB์ญํ ํจ)
json-server --watch db.json
### axios ์ค์น(DB์ ๋ฐ์ดํฐ ๋ณด๋ด๋ ค๊ณ )
npm i axios
### 3001 ํฌํธ๋ก json-server ์ค์  ๋ฐ DB์ฐ๊ฒฐ
json-server --watch db.json --port 3001
```

## axios.post(DB์ ์ ์ก)

```js
import axios from 'axios'

const onSubmit = () => {
    // axios.post๋ ์ ๋ณด๋ฅผ ์ ์กํ๋๊ฑฐ๋ผ๊ณ  ์๊ฐํ๋ฉด ๋๋ค.
    // ํฌํธ 3001์ posts ๋ฐฐ์ด์ title, body ์ ๋ณด๋ฅผ ์๋ ฅํด์ ๋ฃ๋ ๊ตฌ์กฐ์ด๋ค.
    axios.post('http://localhost:3001/posts', {
      title,
      body,
    })
  }
```

## npm run db๋ก json-server ์ ์ง์ ๋ ํฌํธ ์ฐ๊ฒฐํ๋ ๋ฐฉ๋ฒ ๋ฐ ์คํ ๋ฐฉ๋ฒ

```json
//json-server --watch db.json --port 3001 ํด๋น ๋ช๋ น์ด ์ฝ๊ฒ ์คํํ๋ ๋ฐฉ๋ฒ
//package.json ํ์ผ ์ฐธ๊ณ 

  "scripts": {
    "start": "react-scripts start",
    // ์ด๋ ๊ฒ ์ถ๊ฐํ๋ฉด ๋๋ค.
    "db": "json-server --watch db.json --port 3001",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

```bash
# json-server --watch db.json --port 3001 ํด๋น ๋ช๋ น์ด ์ฝ๊ฒ ์คํ
npm run db
```

## reactrouter ์ค์น(5๋ฒ์  ์คํ์, @์ซ์ ์์ผ๋ฉด ๊ทธ๋ฅ ์ต์ ์ด ๊น๋ฆผ) ๋ฐ ๊ตฌ์กฐ ํ์ธ

## ์ต์ ๋ฒ์ ์ ์กฐ๊ธ ๋ช์นญ์ด ๋ค๋ฅธ ๊ฒ์ผ๋ก ์๊ณ  ์์.(ํ์ธํด๋ณผ๊ฒ)

```bash
### router๋ฅผ ์ฌ์ฉํ๋ ค๋ฉด ์ค์นํด์ผ๋จ
npm install react-router-dom@5
```

```js
// ๊ธฐ๋ณธ์ ์ธ ๋ผ์ฐํฐ ๊ตฌ์กฐ์. ์ฐธ๊ณ ํด๋ณด๊ธฐ
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
      </div>
      <Switch>
        { /* exact๋ ๊ฒฝ๋ก๊ฐ ์ ํํ ๋๋ง ํ๋ฉด์ ๋ณด์ฌ์ค๋ค๋ ์๋ฏธ, ๊ทผ๋ฐ ์ด๊ฒ ์์ด์ผ ํ๋ฉด์ด ์คํ๋ ค ์๋์ด*/ }
        <Route path="/" exact> 
          Home Page
        </Route>
        <Route path="/blogs" exact>
          <div className="container">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                value={title}
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
}
```

## BootStrap NavBar ๋ง๋ค๊ณ , Link(to={path}) ๋ฐ ๋ผ์ฐํฐ ๊ฑฐ๋ ๋ฐฉ์ ํ์ธํ๊ธฐ

```js
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
    </Router>
  )
```

## ์ปดํฌ๋ํธ ๊ฐ์ ธ์ค๊ธฐ

```js
//App.js
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// BlogForm ์ปดํฌ๋ํธ๋ฅผ ๊ฐ์ง๊ณ ์์ ๋ถ์ด๋ฉด ๊ทธ๋๋ก ๋์จ๋ค.
import BlogForm from './components/BlogForm'

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/blogs">
                Blogs
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <Switch>
          <Route path="/" exact>
            Home Page
          </Route>
          <Route path="/blogs" exact>
            <BlogForm /> 
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
```

```js
//BlogForm.js ์ปดํฌ๋ํธ.
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
          // onChange ์ด๋ฒคํธ๋ ์๋ ฅ๋๋ ๋๋ก ํจ์ ์คํํ๋ค๋ ์๋ฏธ์ด๋ค.
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
          // onChange ์ด๋ฒคํธ๋ ์๋ ฅ๋๋ ๋๋ก ํจ์ ์คํํ๋ค๋ ์๋ฏธ์ด๋ค.
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
```

## NavBar ์ปดํฌ๋ํธ App.js ์ฐ๊ฒฐ

```js
// App.js
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BlogForm from './components/BlogForm'
// NavBar ์ปดํฌ๋ํธ ์ฐ๊ฒฐํ๊ธฐ
import NavBar from "./components/NavBar";

const App = () => {

  return (
    <Router>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            Home Page
          </Route>
          <Route path="/blogs" exact>
            <BlogForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
```

```js
// NavBar.js
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/blogs">
              Blogs
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
```

## App.js์์ Home, Create, Edit, List ๊ด๋ จ Nav๋ฅผ ๋ชจ๋ ์ปดํฌ๋ํธํํ์ฌ ๋ณด์ฌ์ฃผ๊ธฐ

```js
// App.js
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
// 4๊ฐ์ ์ปดํฌ๋ํธ ํ์ธ
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/blogs" exact>
            <ListPage />
          </Route>
          <Route path="/blogs/create" exact>
            <CreatePage />
          </Route>
          <Route path="/blogs/edit" exact>
            <EditPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
```

## routes.js ํ์ผ์ routes ๋ฐฐ์ด์ map์ผ๋ก ํ๋์ฉ Route๋ฅผ ์ค์ ํ๋ ์์

```js
// App.js
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import routes from "./routes"

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Switch>
          {routes.map((route) => {
            return <Route key={route.path} exact path={route.path} component={route.component}/>
          })}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
```

```js
// routes.js
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/blogs',
    component: ListPage
  },
  {
    path: '/blogs/create',
    component: CreatePage
  },
  {
    path: '/blogs/edit',
    component: EditPage
  },
];

export default routes
```

## NavLink, activeClassName์ผ๋ก ์ธํ active ํจ๊ณผ

```js
//NavBar.js
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink 
              exact
              activeClassName="active"
              className="nav-link" 
              aria-current="page" 
              to="/blogs">
              Blogs
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
```

## axios.get ์์ฒญ์ผ๋ก ๊ฐ์ง๊ณ  ์จ ๊ฒ์ set์ผ๋ก ์์ ํ๋ฉด ๋ค์ ๋ฆฌ๋ ๋๋ง๋๊ณ  ์ด๋ฅผ ๋ฐ๋ณตํ๋ฉด ๋ฌดํ ๋ ๋๋ง์ด ๋๋ค. ๊ทธ๋์ useEffect๋ฅผ ํตํด์ ํ๋ฒ๋ง ๋ ๋๋ง ๋๊ฒ๋ ํ๋ ๊ฒ์ด๋ค

```js
// ListPage.js
import axios from "axios";
import { useState, useEffect } from 'react';

const ListPage = () => {
  const [posts, setPosts] = useState();

  const getPosts = () => {
    axios.get('http://localhost:3001/posts').then((res) => {
      setPosts(res.data);
    })
  }

  useEffect(() => {
    getPosts();
  }, []);


  return (
    <div>
      List Page
    </div>
  )
};

export default ListPage;
```

## axios.get(๋ฐ์ดํฐ ์กฐํ)

```js
// ListPage.js
import axios from "axios";
import { useState, useEffect } from 'react';

const ListPage = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get('http://localhost:3001/posts').then((res) => {
      setPosts(res.data);
    })
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      {posts.map(post => {
        return (
          <div class="card mb-3" key={post.id}>
            <div class="card-body">{post.title}</div>
          </div>
        )
      })}
    </div>
  )
};

export default ListPage;
```

## props ํ๋ ๋ฐฉ๋ฒ(์์์์ ํ์๋ก)

```js
// ListPage.js(์์)
import axios from "axios";
import { useState, useEffect } from "react";
import Card from '../components/Card'

const ListPage = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setPosts(res.data);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      {posts.map((post) => {
        return (
          <Card key={post.id} post={post}/>
        );
      })}
    </div>
  );
};

export default ListPage;
```

```js
// Card.js(ํ์)
const Card = ({post}) => {
  console.log(post)
  return (
    <div className="card mb-3">
      <div className="card-body">
        {post.title}
      </div>
    </div>
  );
};

export default Card;
```

## Children ์ด๋ผ๋ props๋ ์๋ค

```js
//ListPage.js
import axios from "axios";
import { useState, useEffect } from "react";
import Card from '../components/Card'

const ListPage = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setPosts(res.data);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      {posts.map((post) => {
        return (
          {/* 1. ๋จผ์  ์ปดํฌ๋ํธ๋ฅผ ๋ฐ๋ก ๋ซ์ง ์๊ณ  2๊ฐ๋ก ์ด์ด๋๋ค. */}
          <Card key={post.id}>
            {/* ์ฌ๊ธฐ ์์์๋ ํ๊ทธ ์์ฒด๋ฅผ props๋ก ๋๊ฒจ์ฃผ๋๊ฒ children์ด๋ค. */}
            <div className="d-flex justify-content-between">
              <div>{post.title}</div>
              <div>buttons</div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ListPage;
```

```js
//Card.js
const Card = ({children}) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        {/* children์ ํด๋นํ๋ propsํ๊ทธ๊ฐ ์ฌ๊ธฐ๋ก ์จ๋ค๊ณ  ์๊ฐํ๋ฉด ๋๋ค. */}
        {children}
      </div>
    </div>
  );
};

export default Card;
```

> ๋ง์ฝ์ children์ ์กด์ฌ ์ฌ๋ถ๋ฅผ ๋ฐ์ง๋ ค๋ฉด ๋ค์๊ณผ ๊ฐ์ด ํ๋ฉด ๋๋ค

```js
//Card.js
const Card = ({children}) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        {/* children์ ์กด์ฌ ์ฌ๋ถ ๋ฐ์ง๊ธฐ*/}
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

export default Card;
```

> propTypes๋ฅผ ์ฌ์ฉํด์ props์ ํ์์ ์ง์ ํ ์ ์์
> ๋ง์ฝ์ props๊ฐ ์๋ค๋ฉด ๊ธฐ๋ณธ๊ฐ ์ง์ ๋ ๊ฐ๋ฅํจ

```js
// ListPage.js props๊ฐ ์๋ค๋ฉด
return (
  <Card key={post.id} />
);
```

```js
import propTypes from 'prop-types'

// Card.js ์๋ ๋ค์๊ณผ ๊ฐ์ดํ๋ฉด 'Title'์ด ๊ธฐ๋ณธ๊ฐ์ผ๋ก ๋์ฒด๋๋ค.
Card.propTypes = {
  title: propTypes.string,
};

Card.defaultProps = {
  title: 'Title'
};
```

> ๊ธฐ๋ณธ์ ์ผ๋ก props๊ฐ ๊ผญ ์์ด์ผ ํ๋ค๋ฉด ๋ค์๊ณผ ๊ฐ์ด ํ๋ค

```js
//ListPage.js
return (
  <Card key={post.id} title={post.title}/>
);
```

```js
//Card.js
Card.propTypes = {
  title: propTypes.string.isRequired,
};
```

## Link(react-router-dom)๋ฅผ ์ด์ฉํ ๋ฒํผ ๋ง๋ค๊ธฐ

```js
// ListPage.js

import { Link } from 'react-router-dom';

<div className="d-flex justify-content-between">
  <h1>Blogs</h1>
  <div>
    <Link to="/blogs/create" className="btn btn-success">
      Create New
    </Link>
  </div>
</div>
```

## useHistory๋ก ํ์ด์ง ์ด๋ํ๊ธฐ

> ์ปดํฌ๋ํธ ์ง์  ์ด๋ฒคํธ ๋ถ๊ฐ๋ฅ, props๋ก ํจ์๋ฅผ ๋๊ฒจ์ฃผ๊ณ  ํ์ ์ปดํฌ๋ํธ์์ ์ด๋ฒคํธ ๋ฐ์์ํด

```js
// ListPage.js
import { Link, useHistory } from 'react-router-dom';

<Card 
  key={post.id} 
  title={post.title}
  {/* onClick๋ผ๋ props๋ฅผ ๋ค์๊ณผ ๊ฐ์ ํํ์ ํจ์๋ก ๋๊ฒจ์ค */}
  onClick={() => history.push('/blogs/edit')}
/>
```

```js
// Card.js

import propTypes from 'prop-types'

// () => history.push('/blogs/edit') onClick props ๋ฐ์์ค๊ณ 
const Card = ({ title, onClick, children }) => {
  return (
    <div 
      {/* ์ด๋ฒคํธ = {props} */}
      onClick={onClick} 
      className="card mb-3 cursor-pointer" 
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>{title}</div>
          {children && <div>{children}</div>}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: propTypes.string.isRequired,
  children: propTypes.element,
  // props ํ์ ์ ํ๊ธฐ
  onClick: propTypes.func,
};

Card.defaultProps = {
  children: null,
  // props ๊ธฐ๋ณธ๊ฐ
  onClick: () => {},
}

export default Card;

```

## ์ด๋ฒคํธ ๋ฒ๋ธ๋ง ๋ฐฉ์งํ๊ธฐ

```js
// ListPage.js
import axios from "axios";
import { useState, useEffect } from "react";
import Card from '../components/Card';
import { Link, useHistory } from 'react-router-dom';

const ListPage = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setPosts(res.data);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Blogs</h1>
        <div>
          <Link to="/blogs/create" className="btn btn-success">
            Create New
          </Link>
        </div>
      </div>
      {posts.map((post) => {
        return (
          <Card 
            key={post.id} 
            title={post.title}
            onClick={() => history.push('/blogs/edit')}
          >
            <div>
              <button 
                className="btn btn-danger btn-sm"
                onClick={(e) => {
                  {/* ์ด๋ฒคํธ ๋ฒ๋ธ๋ง ๋ฐฉ์งํ๋ ํจ์ */}
                  e.stopPropagation();
                  console.log("Event Bubbling Test")
                }}
              >
                Delete
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ListPage;
```

## DB ์ญ์  ๊ธฐ๋ฅ ๊ตฌํ(axios.delete())

```js
import axios from "axios";
import { useState, useEffect } from "react";
import Card from '../components/Card';
import { Link, useHistory } from 'react-router-dom';

const ListPage = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setPosts(res.data);
    });
  };

  // 2. ์ญ์  ์ด๋ฒคํธ ํจ์
  const deleteBlog = (e, id) => {
    // ์ด๋ฒคํธ ๋ฒ๋ธ๋ง ๋ฐฉ์ง
    e.stopPropagation();
    // delete ์์ฒญ
    axios.delete(`http://localhost:3001/posts/${id}`)
    .then(() => {
      // ๊ธฐ์กด์ ์๋ ๋ฐฐ์ด์ ์์๋ฅผ ํํฐ๋งํ๋๋ฐ, ์ํํ๋ ์์์ id์ ์ญ์ ํ ์์์ id๊ฐ ๋ค๋ฅผ ๊ฒฝ์ฐ๋ก ์๋ก์ด ๋ฐฐ์ด์ ์์ฑํ๋ค.
      // ๊ทธ๋ฌ๋ฉด ์ญ์ ํ์๋ง์, ์ญ์ ํ ์์๊ฐ DB -> ํ๋ฉด ์์ผ๋ก ์ ๊ฑฐ๊ฐ ๋๋ค.
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id))
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Blogs</h1>
        <div>
          <Link to="/blogs/create" className="btn btn-success">
            Create New
          </Link>
        </div>
      </div>
      {posts.map((post) => {
        return (
          <Card 
            key={post.id} 
            title={post.title}
            onClick={() => history.push('/blogs/edit')}
          >
            <div>
              <button 
                className="btn btn-danger btn-sm"
                {/* 1. ํด๋ฆญํ๋ฉด ์ด๋ฒคํธ ํจ์๊ฐ ๋ฐ๋ก ์คํ๋๋๋ฐ, ํน์  id๋ฅผ ๋ฐ์์์ผํ๊ธฐ ๋๋ฌธ์ event์ id๋ฅผ ๋์์ ์ธ์๋ก ๋ฃ์ด์ค๋ค. */}
                onClick={(e) => deleteBlog(e, post.id)}
              >
                Delete
              </button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ListPage;

```

## ๋ธ๋ก๊ทธ์ ๊ฒ์๋ฌผ์ด ์์ผ๋ฉด "No Blog post found" ๋ผ๋ ๋ฌธ๊ตฌ๊ฐ ๋์ค๊ฒํ๋ ์ผํญ์ฐ์ฐ์ ์์

```js
//ListPage.js
import axios from "axios";
import { useState, useEffect } from "react";
import Card from '../components/Card';
import { Link, useHistory } from 'react-router-dom';

const ListPage = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setPosts(res.data);
    });
  };

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    axios.delete(`http://localhost:3001/posts/${id}`)
    .then(() => {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id))
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Blogs</h1>
        <div>
          <Link to="/blogs/create" className="btn btn-success">
            Create New
          </Link>
        </div>
      </div>
      {/* posts.length์ ๊ธธ์ด๋ก ๊ฒ์๊ธ์ ์กด์ฌ์ฌ๋ถ๋ฅผ ํ์ํ๋ค. */}
      {posts.length > 0 ? posts.map((post) => {
        return (
          <Card 
            key={post.id} 
            title={post.title}
            onClick={() => history.push('/blogs/edit')}
          >
            <div>
              <button 
                className="btn btn-danger btn-sm"
                onClick={(e) => deleteBlog(e, post.id)}
              >
                Delete
              </button>
            </div>
          </Card>
        );
        {/* ์์ผ๋ฉด ๋ค์๊ณผ ๊ฐ์ ๋ฌธ๊ตฌ ๋์ค๊ฒ ํ๊ธฐ */}
      }) : 'No blog posts found'}
    </div>
  );
};

export default ListPage;
```

## ํ๋ฉด์ ์ ๋๋ก ๋์ค๊ฒํ๊ธฐ์ ์ loading ํ๋ฉด ๋์ค๊ฒ ํ๊ธฐ

```js
//LoadingSpinner.js ์ผ๋จ ์ปดํฌ๋ํธํ ํ๊ธฐ
const LoadingSpinner = () => {
  return (
    <div className="text-center">
      <button className="btn btn-primary" type="button" disabled>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
      </button>
    </div>
  )
}

export default LoadingSpinner;
```

```js
// ListPage.js
import axios from "axios";
import { useState, useEffect } from "react";
// ๋ก๋ฉ์คํผ๋ ์ปดํฌ๋ํธ ๊ฐ์ ธ์ค๊ธฐ
import LoadingSpinner from "../components/LoadingSpinner";

const ListPage = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  // ์ผ๋จ ๋ก๋ฉ์ ๊ธฐ๋ณธ true
  const [loading, setLoading] = useState(true);
  const getPosts = () => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setPosts(res.data);
      // ๋ฐ์ดํฐ ์ฑ๊ณต์ ์ผ๋ก ๋ฐ์์ค๋ฉด false ๋ฐ๊ฟ์ loading ์์ ๊ธฐ
      setLoading(false);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  // ๋ ๋๋ง ํจ์
  const renderBlogList = () => {
    // ๋ก๋ฉ์ด true์ผ๋ ๋ก๋ฉ์คํผ๋ ๋ฆฌํดํ๊ธฐ
    if (loading) {
      return (
        <LoadingSpinner/>
      )
    }

    // ๊ฒ์๋ฌผ์ด ์์ผ๋ฉด ํด๋น ๋ฌธ๊ตฌ ๋ฆฌํดํ๊ธฐ
    if (posts.length === 0) {
      return (<div>No blog posts found</div>)
    }
    
    // ์์ ์ ์ฝ์กฐ๊ฑด์ด ํด์๋๋ฉด ๊ฒ์๊ธ ๋ฆฌํดํ๊ธฐ
    return posts.map((post) => {
      return (
        <Card 
          key={post.id} 
          title={post.title}
          onClick={() => history.push('/blogs/edit')}
        >
          <div>
            <button 
              className="btn btn-danger btn-sm"
              onClick={(e) => deleteBlog(e, post.id)}
            >
              Delete
            </button>
          </div>
        </Card>
      );
    });
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Blogs</h1>
        <div>
          <Link to="/blogs/create" className="btn btn-success">
            Create New
          </Link>
        </div>
      </div>
      {/* ํจ์๋ฅผ ์คํํ๋ ์์ผ๋ก ๋ ๋๋ง */}
      {renderBlogList()}
    </div>
  );
};

export default ListPage;
```

## ๊ฒ์๊ธ ์์ฑ ํ, ์ ์ฒด ๊ฒ์๊ธ ์กฐํ ํ๋ฉด์ผ๋ก ์ด๋ํ๊ธฐ

```js
//BlogForm.js

import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const BlogForm = () => {
  // ํน์  url๋ก ์ด๋ํ๋ hook
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const onSubmit = () => {
    axios.post("http://localhost:3001/posts", {
      title,
      body,
    // ์์ฑ ์๋ฃ๋๋ฉด ๋ค์ ๊ณผ์ ์ผ๋ก
    }).then(() => {
      // ์ด๋
      history.push('/blogs');
    })
  };
  return (
    <div className="container">
      <h1>Create a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          // onChange ์ด๋ฒคํธ๋ ์๋ ฅ๋๋ ๋๋ก ํจ์ ์คํํ๋ค๋ ์๋ฏธ์ด๋ค.
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
          // onChange ์ด๋ฒคํธ๋ ์๋ ฅ๋๋ ๋๋ก ํจ์ ์คํํ๋ค๋ ์๋ฏธ์ด๋ค.
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
```

## ํ์ฌ ๊ฐ์๋ 34๊ฐ ์๋๋ค

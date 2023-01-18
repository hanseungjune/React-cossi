# 👌리액트에 대한 기초적인 설명

## useState(1)

```js
// useState 관련 기초 설명

import { useState } from 'react'

const App = () => {
  // useState를 써서, number에 값을 저장하고, setNumber()를 통해서 값을 수정한다.
  // 리액트에서는 값을 변경할때, 일반적으로 못바꾸고 useState를 써야함
  const [number, setNumber] = useState(1);
  const double = () => {
    const doubledNumber = number * 2
    // 값 수정
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
    // prevNumber는 number 초기값인 1이다.
    // return 하면서 number의 값이 수정되고, 저장된다.
    setNumber((prevNumber) => prevNumber * 2)  // number => 2
    setNumber((prevNumber) => prevNumber * 2)  // number => 4
    // 고로 4씩 곱해진다.
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
  // input에 값이 기입되고 지워질 때, title에 입력값이 저장된다.
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
          // onChange 이벤트는 입력되는 대로 함수 실행한다는 의미이다.
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
          // onChange 이벤트는 입력되는 대로 함수 실행한다는 의미이다.
          onChange={(event) => {
            setBody(event.target.value)
          }}
        />
      </div>
      <button 
        className="btn btn-primary"
        onClick={onSubmit} //그냥 onClick 이벤트핸들러임
      >Post</button>
    </div>
  );
}

export default App;
```

## json-server 설치 및 저장

```bash
### json-server 설치
npm install -g json-server
### json-server 시작(db.json이 DB역할함)
json-server --watch db.json
### axios 설치(DB에 데이터 보내려고)
npm i axios
### 3001 포트로 json-server 설정 및 DB연결
json-server --watch db.json --port 3001
```

## axios.post(DB에 전송)

```js
import axios from 'axios'

const onSubmit = () => {
    // axios.post는 정보를 전송하는거라고 생각하면 된다.
    // 포트 3001의 posts 배열에 title, body 정보를 입력해서 넣는 구조이다.
    axios.post('http://localhost:3001/posts', {
      title,
      body,
    })
  }
```

## npm run db로 json-server 에 지정된 포트 연결하는 방법 및 실행 방법

```json
//json-server --watch db.json --port 3001 해당 명령어 쉽게 실행하는 방법
//package.json 파일 참고

  "scripts": {
    "start": "react-scripts start",
    // 이렇게 추가하면 된다.
    "db": "json-server --watch db.json --port 3001",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

```bash
# json-server --watch db.json --port 3001 해당 명령어 쉽게 실행
npm run db
```

## reactrouter 설치(5버전 실행시, @숫자 없으면 그냥 최신이 깔림) 및 구조 확인

## 최신버전은 조금 명칭이 다른 것으로 알고 있음.(확인해볼것)

```bash
### router를 사용하려면 설치해야됨
npm install react-router-dom@5
```

```js
// 기본적인 라우터 구조임. 참고해보기
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
      </div>
      <Switch>
        { /* exact는 경로가 정확할때만 화면을 보여준다는 의미, 근데 이게 있어야 화면이 오히려 잘나옴*/ }
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

## BootStrap NavBar 만들고, Link(to={path}) 및 라우터 거는 방식 확인하기

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

## 컴포넌트 가져오기

```js
//App.js
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// BlogForm 컴포넌트를 가지고와서 붙이면 그대로 나온다.
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
//BlogForm.js 컴포넌트.
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
```

## NavBar 컴포넌트 App.js 연결

```js
// App.js
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BlogForm from './components/BlogForm'
// NavBar 컴포넌트 연결하기
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

## App.js에서 Home, Create, Edit, List 관련 Nav를 모두 컴포넌트화하여 보여주기

```js
// App.js
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
// 4개의 컴포넌트 확인
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

## routes.js 파일에 routes 배열을 map으로 하나씩 Route를 설정하는 작업

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

## NavLink, activeClassName으로 인한 active 효과

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

## axios.get 요청으로 가지고 온 것을 set으로 수정하면 다시 리렌더링되고 이를 반복하면 무한 렌더링이 된다. 그래서 useEffect를 통해서 한번만 렌더링 되게끔 하는 것이다

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

## axios.get(데이터 조회)

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

## props 하는 방법(상위에서 하위로)

```js
// ListPage.js(상위)
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
// Card.js(하위)
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

## Children 이라는 props도 있다

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
          {/* 1. 먼저 컴포넌트를 바로 닫지 않고 2개로 열어둔다. */}
          <Card key={post.id}>
            {/* 여기 안에있는 태그 자체를 props로 넘겨주는게 children이다. */}
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
        {/* children에 해당하는 props태그가 여기로 온다고 생각하면 된다. */}
        {children}
      </div>
    </div>
  );
};

export default Card;
```

> 만약에 children의 존재 여부를 따지려면 다음과 같이 하면 된다

```js
//Card.js
const Card = ({children}) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        {/* children의 존재 여부 따지기*/}
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

export default Card;
```

> propTypes를 사용해서 props의 타입을 지정할수 있음
> 만약에 props가 없다면 기본값 지정도 가능함

```js
// ListPage.js props가 없다면
return (
  <Card key={post.id} />
);
```

```js
import propTypes from 'prop-types'

// Card.js 에는 다음과 같이하면 'Title'이 기본값으로 대체된다.
Card.propTypes = {
  title: propTypes.string,
};

Card.defaultProps = {
  title: 'Title'
};
```

> 기본적으로 props가 꼭 있어야 한다면 다음과 같이 한다

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

## Link(react-router-dom)를 이용한 버튼 만들기

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

## useHistory로 페이지 이동하기

> 컴포넌트 직접 이벤트 불가능, props로 함수를 넘겨주고 하위 컴포넌트에서 이벤트 발생시킴

```js
// ListPage.js
import { Link, useHistory } from 'react-router-dom';

<Card 
  key={post.id} 
  title={post.title}
  {/* onClick라는 props를 다음과 같은 형태의 함수로 넘겨줌 */}
  onClick={() => history.push('/blogs/edit')}
/>
```

```js
// Card.js

import propTypes from 'prop-types'

// () => history.push('/blogs/edit') onClick props 받아오고
const Card = ({ title, onClick, children }) => {
  return (
    <div 
      {/* 이벤트 = {props} */}
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
  // props 타입 정하기
  onClick: propTypes.func,
};

Card.defaultProps = {
  children: null,
  // props 기본값
  onClick: () => {},
}

export default Card;

```

## 이벤트 버블링 방지하기

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
                  {/* 이벤트 버블링 방지하는 함수 */}
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

## DB 삭제 기능 구현(axios.delete())

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

  // 2. 삭제 이벤트 함수
  const deleteBlog = (e, id) => {
    // 이벤트 버블링 방지
    e.stopPropagation();
    // delete 요청
    axios.delete(`http://localhost:3001/posts/${id}`)
    .then(() => {
      // 기존에 있던 배열의 요소를 필터링하는데, 순회하는 요소의 id와 삭제한 요소의 id가 다를 경우로 새로운 배열을 생성한다.
      // 그러면 삭제하자마자, 삭제한 요소가 DB -> 화면 순으로 제거가 된다.
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
                {/* 1. 클릭하면 이벤트 함수가 바로 실행되는데, 특정 id를 받아와야하기 때문에 event와 id를 동시에 인자로 넣어준다. */}
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

## 블로그에 게시물이 없으면 "No Blog post found" 라는 문구가 나오게하는 삼항연산자 작업

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
      {/* posts.length의 길이로 게시글의 존재여부를 파악한다. */}
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
        {/* 없으면 다음과 같은 문구 나오게 하기 */}
      }) : 'No blog posts found'}
    </div>
  );
};

export default ListPage;
```

## 화면을 제대로 나오게하기전에 loading 화면 나오게 하기

```js
//LoadingSpinner.js 일단 컴포넌트화 하기
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
// 로딩스피너 컴포넌트 가져오기
import LoadingSpinner from "../components/LoadingSpinner";

const ListPage = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  // 일단 로딩은 기본 true
  const [loading, setLoading] = useState(true);
  const getPosts = () => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setPosts(res.data);
      // 데이터 성공적으로 받아오면 false 바꿔서 loading 없애기
      setLoading(false);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  // 렌더링 함수
  const renderBlogList = () => {
    // 로딩이 true일때 로딩스피너 리턴하기
    if (loading) {
      return (
        <LoadingSpinner/>
      )
    }

    // 게시물이 없으면 해당 문구 리턴하기
    if (posts.length === 0) {
      return (<div>No blog posts found</div>)
    }
    
    // 위의 제약조건이 해소되면 게시글 리턴하기
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
      {/* 함수를 실행하는 식으로 렌더링 */}
      {renderBlogList()}
    </div>
  );
};

export default ListPage;
```

## 게시글 생성 후, 전체 게시글 조회 화면으로 이동하기

```js
//BlogForm.js

import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const BlogForm = () => {
  // 특정 url로 이동하는 hook
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const onSubmit = () => {
    axios.post("http://localhost:3001/posts", {
      title,
      body,
    // 생성 완료되면 다음 과정으로
    }).then(() => {
      // 이동
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
```

## 현재 강의는 34강 입니다

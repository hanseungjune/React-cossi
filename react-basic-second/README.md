# 지금부터 여기나오는 리드미는 리액트에 대한 기초적인 설명을 주석에 녹여낼 것입니다

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

## 현재 강의는 17강 입니다

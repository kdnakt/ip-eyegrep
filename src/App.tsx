import React from 'react';
import './my.css'

function App() {
  return (
    <div>
      <header>
        <h1>IPアドレス<br/>まちがいさがし</h1>
        <h5>ただしくないIPアドレスを<br />クリックしてやっつけよう！</h5>
        <h5>あと<span id="rem">？</span>こ</h5>
      </header>
      <body>
        <div id="btn">さいしょから</div>
        <div id="question"></div>
      </body>
    </div>
  );
}

export default App;

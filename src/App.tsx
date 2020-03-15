import React, { useState, useEffect } from 'react';
import './my.css'
import Questions from './components/Questions';
import useQuiz from './quiz/useQuiz';

const reset = () => {
  document.location.reload()
}

function App() {
  const {invalidCount, questions} = useQuiz("normal");
  const [started, setStarted] = useState(false);
  const [remaining, setRemaining] = useState(invalidCount);
  const [passedSec, setPassedSec] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPassedSec(prev => prev + 1);
    }, 1000);
    return () => clearInterval(id);
  });
  if (remaining === 0) {
    alert(`クリアです！おめでとう🎉\n\nきろく${passedSec}びょう`);
    reset();
  }

  return (
    <div>
      <header>
        <h2>IPアドレスまちがいさがし</h2>
        <h5>ただしくないIPアドレスをクリックしてやっつけよう！</h5>
        <h6>なんびょうでクリアできるかな？</h6>
        {!started ? (
          <>
            <div id="start-btn" onClick={() => {
              setStarted(true);
              setPassedSec(0);
            }}>スタート</div>  
          </>
        ) : (
          <>
            <h5>あと{remaining}こ</h5>
            <h5>きろく：{passedSec}びょう</h5>
            <div id="btn" onClick={reset}>さいしょから</div>
          </>
        )}
      </header>
      <body>
        <div id="question">
          <Questions started={started}
            questions={questions}
            setRemaining={setRemaining}
          />
        </div>
      </body>
      <footer>
        <h6>
          <span>v1.1.0</span>
          <a href="https://twitter.com/kdnakt">©︎ kdnakt</a>
        </h6>
        {started ? undefined : (
          <h6>
            <span>2020/03/13 v1.0.0</span>
            <br />
            <span>2020/03/14 v1.1.0</span>
            <br />
            <span>ストップウォッチ機能を追加</span>
          </h6>
        )}
      </footer>
    </div>
  );
}

export default App;

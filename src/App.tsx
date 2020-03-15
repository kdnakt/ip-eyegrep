import React, { useState, useEffect } from 'react';
import './my.css'
import Questions from './components/Questions';
import { Level, selectQuestions, selectLevelLabel } from './quiz/Quiz';

const reset = () => {
  document.location.reload()
}

function App() {
  const [level, setLevel] = useState("normal" as Level);
  const questions = selectQuestions(level);
  const [started, setStarted] = useState(false);
  const [passedSec, setPassedSec] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPassedSec(prev => prev + 1);
    }, 1000);
    return () => clearInterval(id);
  });
  const [remaining, setRemaining] = useState(questions.invalidCount);
  if (remaining === 0) {
    alert(`クリアです！おめでとう🎉\n\nモード：${selectLevelLabel(level)}\nきろく：${passedSec}びょう`);
    reset();
  }

  const start = (level: Level) => {
    setLevel(level);
    setStarted(true);
    setRemaining(selectQuestions(level).invalidCount);
    setPassedSec(0);
  };

  return (
    <>
      <div>
        <h2>IPアドレスまちがいさがし</h2>
        <h5>ただしくないIPアドレスをクリックしてやっつけよう！</h5>
        <h6>なんびょうでクリアできるかな？</h6>
        {!started ? (
          <div className="start-btns">
            <div className="start-btn start-btn-easy" onClick={() => start("easy")}>かんたん</div>  
            <div className="start-btn start-btn-normal" onClick={() => start("normal")}>ふつう</div>  
            <div className="start-btn start-btn-hard" onClick={() => start("hard")}>むずかしい</div>  
          </div>
        ) : (
          <>
            <h5>あと{remaining}こ</h5>
            <h5>きろく：{passedSec}びょう</h5>
            <div id="btn" onClick={reset}>さいしょから</div>
          </>
        )}
      </div>
      <div style={{clear:"both"}}>
        <div>
          <Questions started={started}
            level={level}
            questions={questions.questions}
            setRemaining={setRemaining}
          />
        </div>
      </div>
      <div>
        <h6>
          <span>v1.3.0</span>
          <a href="https://twitter.com/kdnakt">©︎ kdnakt</a>
        </h6>
        {started ? undefined : (
          <h6>
            <span>2020/03/13 v1.0.0</span>
            <br /><br />
            <span>2020/03/14 v1.1.0</span>
            <br />
            <span>ストップウォッチをついか</span>
            <br /><br />
            <span>2020/03/15 v1.2.0</span>
            <br />
            <span>かんたんモードをついか</span>
            <br /><br />
            <span>2020/03/16 v1.3.0</span>
            <br />
            <span>むずかしいモードをついか</span>
          </h6>
        )}
      </div>
    </>
  );
}

export default App;

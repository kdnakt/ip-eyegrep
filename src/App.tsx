import React, { useState, useEffect } from 'react';
import './my.css'
import Questions from './components/Questions';
import { Level, selectQuestions, selectLevelLabel } from './quiz/Quiz';

const reset = () => {
  document.location.reload()
}

const showLife = (life: number) => {
  switch (life) {
    case 0:
      return '🤍🤍🤍';
    case 1:
      return '❤️🤍🤍';
    case 2:
      return '❤️❤️🤍';
    default:
      return '❤️❤️❤️';
  }
}

const showResult = (life: number) => {
  switch (life) {
    case 0:
      return 'ゲームオーバー☠️';
    case 1:
    case 2:
      return 'クリア⭐️';
    case 3:
      return 'パーフェクトクリア🎉';
    default:
      return 'クリア⭐️';
  }
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
  const [life, setLife] = useState(3);
  const [resultSec, setResultSec] = useState(0);
  useEffect(() => {
    if ((remaining === 0 || life === 0) && resultSec === 0) {
      setResultSec(passedSec);
    }
  }, [remaining, life, passedSec, resultSec]);

  const start = (level: Level) => {
    setLevel(level);
    setStarted(true);
    setRemaining(selectQuestions(level).invalidCount);
    setPassedSec(0);
  };
  const tweetText = `${selectLevelLabel(level)}モードにチャレンジして${resultSec}びょうで${showResult(life)}`;
  return (
    <>
      <div>
        <h2>IPアドレスまちがいさがし</h2>
        <h5>ただしくないIPアドレスをクリックしてやっつけよう！</h5>
        {!started ? (
          <h6>なんびょうでクリアできるかな？</h6>
        ) : undefined}
        {!started ? (
          <div className="start-btns">
            <div className="start-btn start-btn-easy" onClick={() => start("easy")}>かんたん</div>  
            <div className="start-btn start-btn-normal" onClick={() => start("normal")}>ふつう</div>  
            <div className="start-btn start-btn-hard" onClick={() => start("hard")}>むずかしい</div>  
          </div>
        ) : (
          <>
            <h5>{resultSec ? `けっか：${showResult(life)}`: `あと${remaining}こ`}</h5>
            <h5>きろく：{resultSec ? resultSec : passedSec}びょう</h5>
            <h5>ライフ：{showLife(life)}</h5>
            {
              resultSec ? (
                <div id="twitter-btn">
                  <a target="_blank" rel="noopener noreferrer"
                    href={"https://twitter.com/intent/tweet?url=https://kdnakt.github.io/ip-eyegrep"
                      + `&hashtags=${encodeURIComponent("IPアドレスまちがいさがし")}`
                      + `&text=${encodeURIComponent(tweetText)}`}>ツイートする</a>
                </div>
              ) : undefined
            }
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
            setLife={setLife}
            resultSec={resultSec}
          />
        </div>
      </div>
      <div>
        <h6>
          <span>v1.4.0</span>
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
            <br /><br />
            <span>2020/03/17 v1.4.0</span>
            <br />
            <span>ライフをついか</span>
            <br />
            <span>ツイートボタンをついか</span>
          </h6>
        )}
      </div>
    </>
  );
}

export default App;

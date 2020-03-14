import React, { useState, useEffect } from 'react';
import './my.css'

type Target = {
  ip: string;
  valid: boolean;
};

const targets: Target[] = [
  {"ip":"10.0.0.0","valid":true},
  {"ip":"10.20.30.40","valid":true},
  {"ip":"10.120.3.243","valid":true},
  {"ip":"1o.202.56.139","valid":false},
  {"ip":"192.168.34.56","valid":true},
  {"ip":"19Z.168.45.67","valid":false},
  {"ip":"172.16.255.255","valid":true},
  {"ip":"172.17.255.254","valid":true},
  {"ip":"172.18.254.255","valid":true},
  {"ip":"172.19.255.255","valid":true},
  {"ip":"172.20.255.255","valid":true},
  {"ip":"172.21,255.255","valid":false},
  {"ip":"192.168.0.255","valid":true},
  {"ip":"192.168.1O0.255","valid":false},
  {"ip":"192.168.00.255","valid":false},
  {"ip":"10.200.300.400","valid":false},
  {"ip":"192.168.3B.48","valid":false},
  {"ip":"10.256.255.255","valid":false},
  {"ip":"192.l68.0.255","valid":false},
  {"ip":"10.0.1,2","valid":false}
];

const invalidCount = targets.filter(o => !o.valid).length;

const shuffle = ([...array]: Target[]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const questions = shuffle(targets);

const Question: React.FC<{
  q: Target,
  toRight: boolean,
  setRemaining: (func: (n: number) => number) => void,
}> = ({
  q, toRight, setRemaining
}) => {
  const [result, setResult] = useState('');
  return (
    <>
      <span 
        style={{
          marginLeft: toRight ? '60%' : '20%'
        }}
      >{result}</span>
      <span
        onClick={() => {
          if (result) return;
          if (!q.valid) {
            //alert('せいかい！');
            setResult('○');
            setRemaining(prev => prev - 1);
          } else {
            //alert('はずれ！');
            setResult('×');
          }
        }}
        style={{
          textDecoration: result ? 'line-through' : 'none',
        }}
      >
        {q.ip}
      </span>
      <br />
    </>
  );
}

const useQuestions = (
  started: boolean,
  setRemaining: (func: (n: number) => number) => void,
) => {
  const result: JSX.Element[] = [];
  if (!started) return result;
  for (let i = 0, len = questions.length; i < len; i++) {
    result.push(
      <Question
        q={questions[i]} toRight={i % 2 === 0}
        setRemaining={setRemaining}
      />
    );
  }
  return result;
}

const reset = () => {
  document.location.reload()
}

function App() {
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
    alert('クリアです！おめでとう🎉' + `\n\nきろく${passedSec}びょう`);
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
          {useQuestions(started, setRemaining)}
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

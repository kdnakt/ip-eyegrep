import React, { useState } from 'react';
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

// function start() {
//   const t = shuffle(targets)
//   let rem = t.length
//   let toRight = false
//   const question = document.getElementById("question");
//   t.forEach(e => {
//     const q = document.createElement('span')
//     q.innerText = e.ip
//     q.style.marginLeft = toRight ? '60%' : '30%'
//     toRight = !toRight
//     question.append(q)
//     q.addEventListener('click', () => {
//       if (!e.valid) {
//       alert('正解！')
//       q.remove()
      
//       const r = document.getElementById('rem')
//       const next = r.innerText -1
//       if (next == 0) {
//         alert('クリアです！おめでとう🎉')
//         start()
//       } else {
//         r.innerText = next
//       }
//       } else {alert('はずれ！')}
//     }) 
//     if (e.valid) rem--
    
//     question.append(
//       document.createElement('br'))
//   })
//   document.getElementById('rem').innerText = rem
// }
// function reset() {
//   const question = document.getElementById("question");
//   question.remove()
//   const newQ =document.createElement('div')
//   newQ.id = 'question'
//   document.body.append(newQ)
//   start()
// }

const Question: React.FC<{
  q: Target,
  toRight: boolean,
  setRemaining: (func: (n: number) => number) => void,
}> = ({
  q, toRight, setRemaining
}) => {
  const [show, setShow] = useState(true);
  return (
    <>
      <span
        onClick={(e) => {
          if (!q.valid) {
            alert('せいかい！');
            setShow(false);
            setRemaining(prev => prev - 1);
          } else {
            alert('はずれ！');
          }
        }}
        style={{
          marginLeft: toRight ? '60%' : '30%',
          display: show ? 'inline' : 'none',
        }}
      >
        {q.ip}
      </span>
      <br />
    </>
  );
}

const useQuestions = (
  setRemaining: (func: (n: number) => number) => void,
) => {
  const result: JSX.Element[] = [];
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
  const [remaining, setRemaining] = useState(invalidCount);
  if (remaining === 0) {
    alert('クリアです！おめでとう🎉');
    reset();
  }

  return (
    <div>
      <header>
        <h1>IPアドレス<br/>まちがいさがし</h1>
        <h5>ただしくないIPアドレスを<br />クリックしてやっつけよう！</h5>
        <h5>あと{remaining}こ</h5>
      </header>
      <body>
        <div id="btn" onClick={reset}>さいしょから</div>
        <div id="question">
          {useQuestions(setRemaining)}
        </div>
      </body>
    </div>
  );
}

export default App;

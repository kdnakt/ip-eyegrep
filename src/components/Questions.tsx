import React, {FC, useState} from 'react';
import { Target } from '../quiz/Target';

type QuestionsProps = {
  started: boolean,
  questions: Target[],
  setRemaining: (func: (n: number) => number) => void,
};

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
            setResult('○');
            setRemaining(prev => prev - 1);
          } else {
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

const Questions: FC<QuestionsProps> = ({
  started,
  questions,
  setRemaining,
}) => {
  const result: JSX.Element[] = [];
  if (started) {
    for (let i = 0, len = questions.length; i < len; i++) {
      result.push(
        <Question
          q={questions[i]} toRight={i % 2 === 0}
          setRemaining={setRemaining}
        />
      );
    }
  }
  return (
    <div id="question">
      {result}
    </div>
  )
}


export default Questions;

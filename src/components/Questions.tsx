import React, {FC, useState} from 'react';
import { Target, Level } from '../quiz/Quiz';

type QuestionBaseProps = {
  level: Level,
  resultSec: number,
  setRemaining: (func: (n: number) => number) => void,
  setLife: (func: (n: number) => number) => void,
};

type QuestionsProps = QuestionBaseProps & {
  started: boolean,
  questions: Target[],
};

type QuestionProps = QuestionBaseProps & {
  q: Target,
  index: number,
};

const Question: React.FC<QuestionProps> = ({
  q, level, index, setRemaining, setLife, resultSec,
}) => {
  const [result, setResult] = useState('');
  const isHard = "hard" === level;
  if (isHard) {
    return (
      <>
        <span style={{
          marginLeft: index % 3 !== 0 ? '4px' : '3%',
          cursor: 'default'
        }}>
          {result}
        </span>
        <span
          onClick={() => {
            if (result || resultSec) return;
            if (!q.valid) {
              setResult('○');
              setRemaining(prev => prev - 1);
            } else {
              setResult('×');
              setLife(prev => prev - 1);
            }
          }}
          style={{
            textDecoration: result ? 'line-through' : 'none',
            cursor: result ? 'default' : 'pointer'
          }}
        >
          {q.ip}
        </span>
        {index % 3 === 2 ? <br /> : undefined}
      </>
    );
  }
  return (
    <>
      <span 
        style={{
          marginLeft: index % 2 !== 0 ? '40%' : '-25%'
        }}
      >{result}</span>
      <span
        className={result ? undefined : "target"}
        onClick={() => {
          if (result || resultSec) return;
          if (!q.valid) {
            setResult('○');
            setRemaining(prev => prev - 1);
          } else {
            setResult('×');
            setLife(prev => prev - 1);
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
  level,
  questions,
  setRemaining,
  setLife,
  resultSec,
}) => {
  const result: JSX.Element[] = [];
  if (started) {
    for (let i = 0, len = questions.length; i < len; i++) {
      result.push(
        <Question
          key={i}
          level={level}
          q={questions[i]} index={i}
          setRemaining={setRemaining}
          setLife={setLife}
          resultSec={resultSec}
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

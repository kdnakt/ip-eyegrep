import React, {FC, useState} from 'react';
import { Target, Level } from '../quiz/Quiz';

type QuestionsProps = {
  started: boolean,
  level: Level,
  questions: Target[],
  setRemaining: (func: (n: number) => number) => void,
};

type QuestionProps = {
  q: Target,
  level: Level,
  index: number,
  setRemaining: (func: (n: number) => number) => void,
};

const Question: React.FC<QuestionProps> = ({
  q, level, index, setRemaining
}) => {
  const [result, setResult] = useState('');
  const isHard = "hard" === level;
  const toRight = index % 2 === 0;
  return (
    <>
      <span 
        style={{
          marginLeft: toRight && !isHard ? '60%' : '20%'
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
      {!isHard ? <br /> : toRight ? <br /> : undefined}
    </>
  );
}

const Questions: FC<QuestionsProps> = ({
  started,
  level,
  questions,
  setRemaining,
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

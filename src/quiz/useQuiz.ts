import { Level, selectQuestions } from "./Quiz";

const useQuiz = (level: Level) => {
  const questions = selectQuestions(level);
  const invalidCount = questions.filter(o => !o.valid).length;
  return { invalidCount, questions };
};

export default useQuiz;


export type Target = {
  ip: string;
  valid: boolean;
};

export type Level = "easy"
  | "normal"
  | "hard";

const easyTargets: Target[] = [
  {"ip":"10.0.0.0","valid":true},
  {"ip":"10.0.0,1","valid":false},
  {"ip":"10.0.0.2","valid":true},
  {"ip":"10.0.0.3","valid":true},
  {"ip":"10.０.0.4","valid":false},
  {"ip":"10.0.0.5","valid":true},
  {"ip":"10.0.0.6","valid":true},
];

const normalTargets: Target[] = [
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

const shuffle = ([...array]: Target[]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));     [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const countInvalid = (targets: Target[]) => targets.filter(o => !o.valid).length;

type Questions = {
  questions: Target[],
  invalidCount: number,
};

const normalQuestions: Questions = {
  questions: shuffle(normalTargets),
  invalidCount: countInvalid(normalTargets),
};
const easyQuestions: Questions = {
  questions: shuffle(easyTargets),
  invalidCount: countInvalid(easyTargets),
};

export const selectQuestions = (level: Level) => {
  switch (level) {
    case "easy":
      return easyQuestions;
    case "normal":
      return normalQuestions;
    default:
      return normalQuestions;
  }
};

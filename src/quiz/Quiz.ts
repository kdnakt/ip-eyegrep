
export type Target = {
  ip: string;
  valid: boolean;
};

export type Level = "easy"
  | "normal"
  | "hard";

export const selectLevelLabel = (level: Level) => {
  switch (level) {
    case "normal":
      return "ふつう";
    case "easy":
      return "かんたん";
    case "hard":
      return "むずかしい";
    default:
      break;
  }
};

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

const hardTargets: Target[] = [
  {"ip":"192.168.10.20","valid":true},
  {"ip":"192.168.0.100","valid":true},
  {"ip":"192.168.30.40","valid":true},
  {"ip":"192.168.30.41","valid":true},
  {"ip":"192.168.3.243","valid":true},
  {"ip":"192.168.3.244","valid":true},
  {"ip":"192.168.2.132","valid":true},
  {"ip":"192.168.5.139","valid":true},
  {"ip":"192.168.34.56","valid":true},
  {"ip":"192.168.34.57","valid":true},
  {"ip":"192.168.45.67","valid":true},
  {"ip":"192.1b8.45.67","valid":false},
  {"ip":"172.16.25.255","valid":true},
  {"ip":"172.16.24.255","valid":true},
  {"ip":"172.17.25.254","valid":true},
  {"ip":"172.17.24.254","valid":true},
  {"ip":"172.18.24.255","valid":true},
  {"ip":"172.18.24.254","valid":true},
  {"ip":"172.19.25.255","valid":true},
  {"ip":"172.|9.24.255","valid":false},
  {"ip":"172.20.255.25","valid":true},
  {"ip":"172.20.254.2S","valid":false},
  {"ip":"172.21,255.25","valid":false},
  {"ip":"172.21.25.255","valid":true},
  {"ip":"172.22.53.255","valid":true},
  {"ip":"192.168.0.255","valid":true},
  {"ip":"192.168.91.73","valid":true},
  {"ip":"192.168.0.254","valid":true},
  {"ip":"192.168.1O0.2","valid":false},
  {"ip":"192.168.100.5.","valid":false},
  {"ip":"192.168.0.255","valid":true},
  {"ip":"192.168.10.70","valid":true},
  {"ip":"172.20.300.400","valid":false},
  {"ip":"172.20.30.20l","valid":false},
  {"ip":"192.168.3B.48","valid":false},
  {"ip":"192.168.38.48","valid":true},
  {"ip":"192.168.45.55","valid":true},
  {"ip":"192.168.255.7","valid":true},
  {"ip":"l92.168.0.255","valid":false},
  {"ip":"192.168.2.255","valid":true},
  {"ip":"172.30.129.26","valid":true},
  {"ip":"172.20.130.43","valid":true}
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
const hardQuestions: Questions = {
  questions: shuffle(hardTargets),
  invalidCount: countInvalid(hardTargets),
};

export const selectQuestions = (level: Level) => {
  switch (level) {
    case "easy":
      return easyQuestions;
    case "normal":
      return normalQuestions;
    case "hard":
      return hardQuestions;
    default:
      return normalQuestions;
  }
};

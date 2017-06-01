const funchain = require('../src/index');

const _true = () => {
  return true;
};
const _false = () => {
  return false;
};

console.log(
  'run:',
  funchain(_true)(),
  '(true)'
);

console.log(
  'true && false:',
  funchain(_true).and(_false)(),
  '(false)'
);

console.log(
  'true && (false || true):',
  funchain(_true).and(funchain(_false).or(_true))(),
  '(true)'
);

console.log(
  'true && (false || true) => reverse with try:',
  funchain(_true).and(funchain(_false).or(_true)).try(_false, _true)(),
  '(false)'
);
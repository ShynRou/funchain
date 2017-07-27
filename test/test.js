const {Funchain, Callchain} = require('../src/index');

const test = function (description, expected, result) {
  if(expected !== result) {
    throw description + '(' + expected + ')' + result;
  }
};

const _true = () => {
  return true;
};
const _false = () => {
  return false;
};

const _cb_true = (cb) => {
  return cb(true);
};
const _cb_false = (cb) => {
  return cb(false);
};

test(
  'run:',
  true,
  Funchain(_true)()
);

test(
  'true && false:',
  false,
  Funchain(_true).and(_false)()
);

test(
  'true && !false:',
  true,
  Funchain(_true).and(Funchain(_false).not())()
);

test(
  'true && (false || true):',
  true,
  Funchain(_true).and(Funchain(_false).or(_true))()
);

test(
  'true && (false || true) => reverse with try:',
  false,
  Funchain(_true).and(Funchain(_false).or(_true)).try(_false,_true)()
);


Callchain(_cb_false).or(_cb_true).and(_cb_true)(r => test('call( false || true && true ):', true, r));
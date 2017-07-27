const Callchain = function (func) {

  var chain = function(callback, ...param) {
    return chain.func(callback, param);
  };

  chain.func = func;

  chain.and = function (func) {
    return Callchain((callback, param) => chain.func((result) => result && func(callback, param) , param));
  };

  chain.or = function (func) {
    return Callchain((callback, param) =>  chain.func((result) => result || func(callback, param) , param));
  };


  chain.not = function () {
    return Callchain((callback, param) => chain.func((result) => callback(!result), param));
  };

  chain.pipe = function (func) {
    return Callchain((callback, param) => chain.func((result) => func(callback, result) , param));
  };

  chain.try = function (success, failure) {

    return Callchain((callback, param) => {
      var result = null;
      try {
        result = chain.func(result => success(callback, result), param);
      }
      catch (e) {
        failure(callback, result);
      }
    });
  };

  return chain;
};

module.exports = Callchain;
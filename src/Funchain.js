const Funchain = function (func) {

  var chain = function(param) {
    return chain.func(param);
  };

  chain.func = func;

  chain.and = function (func) {
    return Funchain((param) => chain.func(param) && func(param));
  };

  chain.or = function (func) {
    return Funchain((param) => chain.func(param) || func(param));
  };


  chain.not = function () {
    return Funchain((param) => !chain.func());
  };

  chain.pipe = function (func) {
    return Funchain((param) => func(chain.func(param)));
  };

  chain.try = function (success, failure) {

    return Funchain((param) => {
      var result = null;
      try {
        result = chain.func(param);
      }
      catch (e) {
        failure(result);
      }
      return success(result);
    });
  };

  return chain;
};

module.exports = Funchain;
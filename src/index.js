const funchain = function (func) {

  var chain = function(param) {
    return chain.func && chain.func(param);
  };

  chain.func = func;

  chain.and = function (func) {
    return funchain((param) => chain.func(param) && func(param));
  };

  chain.or = function (func) {
    return funchain((param) => chain.func(param) || func(param));
  };

  chain.pipe = function (func) {
    return funchain((param) => func(chain.func(param)));
  };

  /**
   * execute following only if first successful => !!
   */
  chain.then = function (success) {
    return funchain((param) => {
      var result = chain.func(param);
      return result && success(result);
    });
  };

  /**
   * execute success or failure function depending on boolean result
   */
  chain.catch = function (failure) {
    return funchain((param) => {
      var result = chain.func(param);
      return result || failure(result);
    });
  };

  return chain;
};

module.exports = funchain;
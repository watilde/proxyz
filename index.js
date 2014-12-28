var Proxyz = function (receiver, handler) {
  var target = Object.create(receiver, {
    set: {
      writable: false,
      enumerable: false,
      configurable: false,
      value: function (name, val) {
        if (!handler.set) {
          this[name] = val;
          return true;
        }
        return handler.set(target, name, val, receiver);
      }
    },
    get: {
      writable: false,
      enumerable: false,
      configurable: false,
      value: function (name) {
        if (!handler.get) {
          return this[name];
        }
        return handler.get(target, name, receiver);
      }
    },
    keys: {
      writable: false,
      enumerable: false,
      configurable: false,
      value: function () {
        if (!handler.keys) {
          return Object.keys(target);
        }
        return handler.keys(target);
      }
    },
    enumerate: {
      writable: false,
      enumerable: false,
      configurable: false,
      value: function (iteratee) {
        if (!handler.enumerate) {
          return Object.keys(target).forEach(function (name) {
            var item = {};
            item[name] = target[name];
            iteratee(item);
          });
        }
        return handler.enumerate(target);
      }
    },
    has: {
      writable: false,
      enumerable: false,
      configurable: false,
      value: function (name) {
        if (!handler.has) {
          return name in target;
        }
        return handler.has(target, name);
      }
    },
    hasOwn: {
      writable: false,
      enumerable: false,
      configurable: false,
      value: function (name) {
        if (!handler.hasOwn) {
          return ({}).hasOwnProperty.call(target, name);
        }
        return handler.hasOwn(target, name);
      }
    },
  });

  return target;
};

var handler = function () {};
var foo = new Proxyz({}, handler);

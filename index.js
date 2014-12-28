var methane = function (receiver, handler) {
  var Proxy = window.Proxy || false;
  if (Proxy) {
    return Proxy(receiver, handler);
  }
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
      value: function (proxy) {
        if (!handler.keys) {
          return Object.keys(proxy);
        }
        return handler.keys(proxy);
      }
    }
  });

  return target;
};

var handler = function () {};
handler.get = function (target, name, receiver) {
  return target[name];
};
var foo = methane({}, handler);
foo.set('key', 'value');
foo.get('key'); // => value

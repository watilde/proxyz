function Proxyz(target, handler) {
  var type = typeof target;
  type = type.charAt(0).toUpperCase() + type.slice(1);
  this.target = target;
  this.receiver = eval('new ' + type + '(target)');
  this.handler = handler;
  this.isProxy = (typeof Proxy !== 'undefined');
}

Proxyz.prototype.set = function (name, val) {
  if (this.isProxy || !this.handler.set) {
    this.target[name] = val;
    return true;
  }
  return this.handler.set(this.target, name, val, this.receiver);
};

Proxyz.prototype.get = function (name) {
  if (this.isProxy || !this.handler.get) {
    return this.target[name];
  }
  return this.handler.get(this.target, name, this.receiver);
};

Proxyz.prototype.keys = function () {
  if (this.isProxy || !this.handler.keys) {
    return Object.keys(this.target);
  }
  return this.handler.keys(this.target);
};

Proxyz.prototype.enumerate = function (iteratee) {
  if (this.isProxy || !this.handler.enumerate) {
    return Object.keys(this.target).forEach(function (name) {
      var item = {};
      item[name] = this.target[name];
      iteratee(item);
    });
    return this.handler.enumerate(this.target);
  }
};

Proxyz.prototype.has = function (name) {
  if (this.isProxy || !this.handler.has) {
    return name in this.target;
  }
  return this.handler.has(this.target, name);
};

Proxyz.prototype.hasOwn = function (name) {
  if (this.isProxy || !this.handler.hasOwn) {
    return ({}).hasOwnProperty.call(this.target, name);
  }
  return this.handler.hasOwn(this.target, name);
};

var handler = function () {};
var foo = new Proxyz({}, handler);

foo.set('key', 'val');

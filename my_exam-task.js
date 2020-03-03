'use strict';

const EventEmitter = function() {
  this.events = {};
};

EventEmitter.prototype.on = function(name, fn) {
  const event = this.events[name];
  if (event) event.push(fn);
  else this.events[name] = [fn];
};

EventEmitter.prototype.emit = function(name, ...data) {
  const event = this.events[name];
  if (!event) return;
  for (const fn of event) {
    fn(...data);
  }
};

class Seq extends EventEmitter {
  constructor() {
    super();
    this.array = [];
  }

  put(arg) {
    if (this.array.includes(arg)) {
      this.emit('on duplicate', arg);
    } else {
      this.array.push(arg);
    }
  }

  show(cb) {
    cb(this.array);
  }
}

const test = new Seq();

test.on('on duplicate', arg => {
  console.log(arg);
});

test.put(1);
test.put(3);
test.put(5);
test.put(6);
test.put(7);
test.put(5);
test.put(1);
test.put(3);
test.put(7);
test.show(console.log);


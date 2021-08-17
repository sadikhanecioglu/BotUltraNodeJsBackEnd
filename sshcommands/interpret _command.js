var CommandContext = function (type,params) {
  this.input = type;
  this.params = params;
  this.output = "";
};

CommandContext.prototype = {
  startsWith: function (str) {
    return this.input.substr(0, str.length) === str;
  },
  GetCommand: function (separator) {
    var splitedCommand = this.input.split(separator);
    return splitedCommand;
  },
  GetParams: function (separator) {
    var splitedCommand = this.params.split(separator);
    return splitedCommand;
  }
};

var Expression = function (name,params) {

    this.name = name;
    this.params = params;

};

Expression.prototype = {
  interpret: function (context) {
    if (context.input.length == 0) {
      return;
    } else if (context.startsWith(this.nine)) {
      context.output += 9 * this.multiplier;
      context.input = context.input.substr(2);
    } else if (context.startsWith(this.four)) {
      context.output += 4 * this.multiplier;
      context.input = context.input.substr(2);
    } else if (context.startsWith(this.five)) {
      context.output += 5 * this.multiplier;
      context.input = context.input.substr(1);
    }
    while (context.startsWith(this.one)) {
      context.output += 1 * this.multiplier;
      context.input = context.input.substr(1);
    }
  }
};
module.exports = {CommandContext};
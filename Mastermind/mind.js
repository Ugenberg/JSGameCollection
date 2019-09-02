Game = function(digits, colors, limit) {
  this.digits = digits;
  this.colors = colors;
  this.maxCount = limit;
  this.solution = [];
  this.guessCount = 0;
  this.html = new View(this);
  this.init();
};

Game.prototype.init = function() {
  this.guessCount = 0;
  this.solution = [];
  for (let i = 0; i < this.digits; i++) {
    this.solution.push(Math.floor(Math.random() * this.colors));
  };
  console.log("Solution :", this.solution);
};

Game.prototype.noteGuess = function(guess) {
  this.guessCount += 1;
  var x = 0;
  var y = 0;
  var sol_ = [];
  var guess_ = [];

  for (let i = 0; i < this.solution.length; i++) {
    if (this.solution[i] === guess[i]) {
      x += 1;
    } else {
      sol_.push(this.solution[i]);
      guess_.push(guess[i]);
    }
  };

  sol_.sort();
  guess_.sort();
  while (sol_.length > 0 && guess_.length > 0) {
    if (sol_[0] < guess_[0]) {
      sol_.shift();
    } else if (sol_[0] > guess_[0]) {
      guess_.shift();
    } else {
      y += 1;
      sol_.shift();
      guess_.shift();
    }
  };
  return [x, y];
};

function getVar(variable) {
  var x = window.location.search.substring(1);
  var vars = x.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (false);
}

let colors = parseInt(getVar("colors"));
if (!colors) {
  colors = 10;
} else if (colors < 1) {
  colors = 1;
} else if (colors > 8) {
  colors = 10;
}

let digits = parseInt(getVar("digits"));
if (!digits) {
  digits = 4;
} else if (digits < 1) {
  digits = 1;
} else if (digits > 8) {
  digits = 10;
}

let limit = parseInt(getVar("limit"));
if (!limit) {
  limit = 12;
} else if (limit < 1) {
  limit = 1;
} else if (limit > 20) {
  limit = 20;
}

var game = new Game(digits, colors, limit);
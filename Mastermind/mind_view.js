removeChildren = function(par) {
  while (par.firstChild) {
    par.removeChild(par.firstChild);
  };
};


View = function(game) {
  this.centerBoard = document.querySelector("#centerBoard")
  this.topbar      = document.querySelector("#masterGrid");
  this.board       = document.querySelector("#board");
  this.rightGrid   = document.querySelector("#rightGrid");
  this.midGrid     = document.querySelector("#midGrid");
  this.leftGrid    = document.querySelector("#leftGrid");
  this.overlay     = document.querySelector("#overlay");

  this.game = game;
  this.play = true;
  this.guess = [];
  this.loadTopBar();
  this.loadRightGrid();
};


View.prototype.loadTopBar = function() {
  var thiss = this;
  let par = null;

  par = document.createElement("span");
  par.className = "button";
  par.innerHTML = "New Game";
  par.onclick = function() {
    thiss.newGame();
  };
  thiss.topbar.appendChild(par);

  par = document.createElement("span");
  par.className = "button";
  par.innerHTML = "Clear";
  par.onclick = function() {
    if (thiss.play) {
      thiss.cancelLastColor();
    };
  };
  thiss.topbar.appendChild(par);

  par = document.createElement("span");
  par.className = "button";
  par.innerHTML = "Check";
  par.onclick = function() {
    if (thiss.play) {
      thiss.checkGuess();
    };
  };
  thiss.topbar.appendChild(par);
  
  par = document.createElement("span");
  par.className = "button";
  par.innerHTML = "Help";
  par.onclick = function() {
    if (thiss.play) {
      thiss.showHelp();
    };
  };
  thiss.topbar.appendChild(par);
  
  par = document.createElement("span");
  par.className = "button";
  par.innerHTML = "Quit";
  par.onclick = function() {
    if (thiss.play) {
      thiss.quitGame();
    };
  };
  thiss.topbar.appendChild(par);
};

View.prototype.loadRightGrid = function() {
  var thiss = this;
  var game = this.game;
  
  for (let i = 0; i < game.colors; i++) {
    let par = document.createElement("div");
    par.className = "color color-" + i;
    par.setAttribute("style", "cursor: pointer;");
    par.onclick = function() {
      thiss.playColor(eval(par.className.split('-').pop()));
    };
    thiss.rightGrid.appendChild(par);
  };
};

View.prototype.newGame = function() {
  removeChildren(this.leftGrid);
  removeChildren(this.midGrid);
  removeChildren(this.overlay);
  this.overlay.innerHTML = "";
  this.overlay.id = "overlay";
  this.resetGuess();
  this.play = true;
  this.game.init();
};

View.prototype.resetGuess = function() {
  this.guess = [];
  this.updateGuess();
};

View.prototype.cancelLastColor = function() {
  this.guess.pop();
  this.updateGuess();
};

View.prototype.showHelp = function() {
  var popup = document.getElementById("myPopup");
  var span = document.getElementsByClassName("close")[0];
  popup.style.display = "block";
  span.onclick = function() {
    popup.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  } 
};

View.prototype.playColor = function(color) {
  if (this.guess.length < this.game.digits) {
    this.guess.push(color);
    this.updateGuess();
  }
};

View.prototype.checkGuess = function() {
  if (this.guess.length === this.game.digits) {
    let note = this.game.noteGuess(this.guess);
    let x = note[0];
    this.printNote(note);

    let par = document.getElementById("currentGuess");
    par.removeAttribute("id");
    par.className = "oldGuess";

    if (x === this.game.digits) {
      this.endOfGame();
    } else if (this.game.guessCount === this.game.maxCount) {
      this.gameOver();
    } else {
      this.resetGuess();
    }
  }
};

View.prototype.updateGuess = function() {
  let par = document.getElementById("currentGuess");
  if (par !== null) {
    par.remove();
  }
  par = this.showCombination(this.guess);
  par.id = "currentGuess";
  this.midGrid.appendChild(par);
};

View.prototype.showCombination = function(table) {
  let par = document.createElement("div");
  for (let i = 0; i < table.length; i++) {
    let par2 = document.createElement("div");
    par2.className = "color color-" + table[i];
    par.appendChild(par2);
  };
  return par;
};

View.prototype.printNote = function(note) {
  let par = document.createElement("div");
  par.className = "guessFieldContainer";
  for (let i = 0; i < this.game.digits; i++) {
    let par2 = document.createElement("div");
    if (note[0] > 0) {
      par2.className = "guessField guessField-0";
      note[0] -= 1;
    } else if (note[1] > 0) {
      par2.className = "guessField guessField-1";
      note[1] -= 1;
    } else {
      par2.className = "guessField guessField-2";
    }
    par.appendChild(par2);
  };
  this.leftGrid.appendChild(par);
};

View.prototype.endOfGame = function() {
  var a = this.game.guessCount;
  this.overlay.innerHTML = "Won in " + a + (a > 1 ? " moves!" : " move!!")
  this.play = false;
};

View.prototype.gameOver = function() {
  this.play = false;
  this.overlay.innerHTML = "Game over!<br>";
  let par = this.showCombination(this.game.solution);
  par.id = "solution";
  this.overlay.appendChild(par);
};

View.prototype.quitGame = function() {
	window.location.href="../menu.html";
};
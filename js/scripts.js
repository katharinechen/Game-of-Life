var GameOfLife = {
  initialize: function(sizeX, sizeY) {
    this.world = [];
    this.nextWorld = [];
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    for(var index = 0; index < sizeX * sizeY; index++) {
      this.world.push(false);
      this.nextWorld.push(false);
    }
    return this.world;
  },
  // returns the index (place to read/write) for this.world
  // array
  // returns -1 for invalid indexes
  getIndex: function(x, y) {
    if (x >= this.sizeX || x < 0 || y > this.sizeY || y < 0) {
      return -1;
    }
    return y * this.sizeX + x;
  },

  setStatus: function(x, y, isAlive) {
    var index = this.getIndex(x, y);
    if (index === -1) { return -1; }
    this.nextWorld[this.getIndex(x, y)] = isAlive;
    return 1;
  },

  getStatus: function(x, y) {
    var index = this.getIndex(x, y);
    if (index === -1) { return false; }
    return this.world[this.getIndex(x, y)];

  },

  countNeighbors: function(x,y) {
    var count = 0;

    // check the left neighbor
    if (this.getStatus(x-1, y))   { count ++; }
    if (this.getStatus(x+1, y))   { count ++; }
    if (this.getStatus(x-1, y-1)) { count ++; }
    if (this.getStatus(x,   y-1)) { count ++; }
    if (this.getStatus(x+1, y-1)) { count ++; }
    if (this.getStatus(x-1, y+1)) { count ++; }
    if (this.getStatus(x,   y+1)) { count ++; }
    if (this.getStatus(x+1, y+1)) { count ++; }

    return count;
  },

  updateStatus: function(x, y) {
    // check to see if this cell is alive
    if (this.getStatus(x, y)) {
      if (this.countNeighbors(x, y) < 2) {
        this.setStatus(x, y, false);
        return;
      } else if ((this.countNeighbors(x,y) === 2 )|| (this.countNeighbors(x,y) === 3)) {
        return;
      } else if (this.countNeighbors(x,y) > 3) {
        this.setStatus(x, y, false);
      }
    } else {
      if (this.countNeighbors(x, y) === 3) {
        this.setStatus(x, y, true);
        return;
      }
    }
  },

  generation: function() {
    for (var y=0; y < this.sizeY; y++) {
      for(var x=0; x < this.sizeX; x++) {
        this.updateStatus(x,y);
      }
    }
    this.world = this.nextWorld.slice(0);
  }

};



$(document).ready(function() {

  $("#game-setup").submit(function(event){

    // var length = $("#xcord").val();
    // var height = $("#ycord").val();

//    gameOfLife.initialize(length, height);

    alert("In submit()");
    var x, y;
    var gameOfLife = Object.create(GameOfLife);
    gameOfLife.initialize(40, 40);

    for(y=0;y<40;y++) {
      for(x = 0; x < 40; x++) {
        if (!(parseInt(Math.random() * 3))) {
          gameOfLife.setStatus(x, y, true);
        }

      }
    }
    // gameOfLife.setStatus(1,1, true);
    // gameOfLife.setStatus(1,2, true);
    // gameOfLife.setStatus(1,3, true);

    $("#game-board").show();

    var mainLoop = function() {
      console.log(gameOfLife.world);

      gameOfLife.generation();

      $("#game-board").empty();

      var tableHTML = "";
      for( y=0; y < gameOfLife.sizeY; y++) {
        tableHTML = tableHTML + "<tr>";
        //$("#game-board").append("<tr>");
        for( x=0; x < gameOfLife.sizeX; x++) {
          if (gameOfLife.getStatus(x, y)) {
            tableHTML = tableHTML + "<td class='nonblank'>&nbsp;</td>";
            //$('#game-board').append("<td class='nonblank'>&nbsp;</td>");
          } else {
            tableHTML = tableHTML + "<td class='blank'>&nbsp;</td>";
            //$('#game-board').append("<td class='blank'>&nbsp;</td>");
          }
        }

        tableHTML = tableHTML + "</tr>";
        //$("td:last-child").after("</tr>");
      }

      $("#game-board").append(tableHTML);
    }


    window.setInterval(mainLoop, 100);
    mainLoop();
    event.preventDefault();
  });
});


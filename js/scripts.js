

var GameOfLife = {
  initialize: function(sizeX, sizeY) {
    this.world = [];
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    for(var index = 0; index < sizeX * sizeY; index++) {
      this.world.push(false);
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
    this.world[this.getIndex(x, y)] = isAlive;
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
  }

};

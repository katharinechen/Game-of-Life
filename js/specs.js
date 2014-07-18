// Tests Go Here!
describe("GameOfLife", function() {
  describe("initialize", function() {
    it("returns an array whose length = sizeX * sizeY", function() {
      var gameOfLife = Object.create(GameOfLife);
      gameOfLife.initialize(6, 6).length.should.equal(6*6);
    });
  });
  describe("getIndex", function() {
    it("returns the index into the game array when given x, y values", function() {
      var gameOfLife = Object.create(GameOfLife);
      gameOfLife.initialize(6, 6);
      gameOfLife.getIndex(3, 3).should.equal(21);

    });
    it("returns -1 when given an x, y position outside of the world", function() {
      var gameOfLife = Object.create(GameOfLife);
      gameOfLife.initialize(10, 10);
      gameOfLife.getIndex(-10, -10).should.equal(-1);
      gameOfLife.getIndex(11, 12).should.equal(-1);
    });
  });
  describe("makeLife", function() {
    it("brings life to a given cell at x,y", function() {
      var gameOfLife = Object.create(GameOfLife);
      gameOfLife.initialize(100, 100);
      gameOfLife.setStatus(2, 2, true);
      gameOfLife.world[gameOfLife.getIndex(2, 2)].should.equal(true);

    });
  });
  describe("getStatus", function() {
    it("returns the status of a life cell at x, y", function() {
      var gameOfLife = Object.create(GameOfLife);
      gameOfLife.initialize(6, 6);
      gameOfLife.setStatus(1, 1, true);
      gameOfLife.setStatus(2, 2, false);

      gameOfLife.getStatus(1, 1).should.equal(true);
      gameOfLife.getStatus(2, 2).should.equal(false);
      console.log(gameOfLife.world);
    });
  });
  describe("countNeighbors", function() {
    it("returns the number of neighbors for a cell at x, y", function() {
      var gameOfLife = Object.create(GameOfLife);
      gameOfLife.initialize(3,3);
      gameOfLife.setStatus(2,0, true);
      gameOfLife.setStatus(2,2, true);
      gameOfLife.setStatus(0,2, true);
      gameOfLife.countNeighbors(1,1).should.equal(3);

    });
  });
  describe("updateStatus", function() {
    it("toggles true cells to false when that cell has fewer than two live neighbors", function() {
      var gameOfLife = Object.create(GameOfLife);
      gameOfLife.initialize(3, 3);
      gameOfLife.setStatus(0, 0, true);
      gameOfLife.world[0].should.equal(true);

      gameOfLife.updateStatus(0, 0);
      gameOfLife.world[0].should.equal(false);
    });
    it("stay true if cell have two or three live neighbors", function() {
      var gameOfLife = Object.create(GameOfLife);
      gameOfLife.initialize(3, 3);
      gameOfLife.setStatus(1, 1, true);
      gameOfLife.world[4].should.equal(true);
      gameOfLife.setStatus(2, 0, true);
      gameOfLife.setStatus(2, 1, true);
      gameOfLife.setStatus(0, 2, true);

      gameOfLife.updateStatus(1, 1);
      gameOfLife.world[4].should.equal(true);
    });
    it("toggles true cells to false when selected cell has more than three live neighbors", function() {
      var gameOfLife = Object.create(GameOfLife);
      gameOfLife.initialize(3,3);
      gameOfLife.world.forEach(function(cell) {
        cell = true;
      });
      gameOfLife.updateStatus(1,1);
      gameOfLife.getStatus(1,1).should.equal(false);
    });
    it("sets any dead(false) cell to true if that cell has exactly three living (true) neighbors", function() {
      var gameOfLife = Object.create(GameOfLife);
      gameOfLife.initialize(3, 3);

      gameOfLife.setStatus(1, 0, true);
      gameOfLife.setStatus(1, 1, true);
      gameOfLife.setStatus(0, 1, true);

      gameOfLife.updateStatus(0, 0);
      gameOfLife.getStatus(0, 0).should.equal(true);
    });
  });

  describe("generation", function() {
    it("simulates a single generation with 2 initial live cells with no neighbors", function() {
      var gameOfLife = Object.create(GameOfLife);
      gameOfLife.initialize(3, 3);
      gameOfLife.setStatus(1, 0, true);
      gameOfLife.setStatus(2, 2, true);

      gameOfLife.generation();
      gameOfLife.world.should.eql([false, false, false, false, false, false, false, false, false]);
    });
    it("simulates a single generation for a simple 2x2 world", function() {
      var gameOfLife = Object.create(GameOfLife);
      gameOfLife.initialize(2, 2);

      gameOfLife.setStatus(1, 0, true);
      gameOfLife.setStatus(0, 1, true);
      gameOfLife.setStatus(1, 1, true);

      gameOfLife.generation();
      gameOfLife.world.should.eql([true, true, true, true]);

    });
  });

});


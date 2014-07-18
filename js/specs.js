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

});


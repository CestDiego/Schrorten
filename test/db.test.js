var request = require('supertest');
var expect = require('chai').expect;
var app = require('../server.js').app;
var db = require('../db.js');


describe("Database", function() {
  var key = "asdasd",
      urlOBject = {
        url: "https://google.com/",
        isRickRollled: false
      }
  describe("Saving to Database", function(done) {
    beforeEach(function() {
      db.save(key, urlOBject)
    });

    it("Should be consistent", function(done) {
      var exp = db.get(key);
      expect(exp).to.exist;
      done()
    });
  });
});

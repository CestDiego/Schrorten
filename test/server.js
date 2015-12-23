var request = require('supertest');
var expect = require('chai').expect;
var app = require('../server.js').app;


describe("Server should", function() {
  it('respond with 200 for home', function(done){
    request(app)
      .get('/')
      .expect(200, done);
  })
  it('responds with json to /api/v1/url', function (done) {
    request(app)
      .post('/api/v1/url')
      .send({url: "http://google.com", customKey: false})
      .expect(200, done)
      .expect('Content-Type', /json/)
  })

  it('return same result if url is sent twice', function (done){
    request(app)
      .post('/api/v1/url')
      .set('Accept', 'application/json')
      .send({url: "http://google.com", customKey: false})
      .end(function (err, res) {
        expect(res.status).to.equal(200);
        request(app)
          .post('/api/v1/url')
          .set('Accept', 'application/json')
          .send({url: "http://google.com", customKey: false})
          .end(function (err, res2) {
            expect(res.body).to.deep.equal(res2.body)
            done()
          })
      });
  })
});

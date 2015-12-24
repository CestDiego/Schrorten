var request = require('supertest');
var expect = require('chai').expect;
var app = require('../server.js').app;


describe("Server", function() {
  it('should respond with 200 for home', function(done){
    request(app)
      .get('/')
      .expect(200, done);
  })

  it('should respond with a json if POST to /api/v1/url', function (done) {
    request(app)
      .post('/api/v1/url')
      .send({url: "http://google.com", customKey: false})
      .expect(200, done)
      .expect('Content-Type', /json/)
  })

  it('should return the same result if url is sent twice', function (done){
    var requestData = {url: "http://google.com", customKey: false}
    request(app)
      .post('/api/v1/url')
      .set('Accept', 'application/json')
      .send(requestData)
      .end(function (err, res) {
        expect(res.status).to.equal(200);
        request(app)
          .post('/api/v1/url')
          .set('Accept', 'application/json')
          .send(requestData)
          .end(function (err, res2) {
            expect(res.body).to.deep.equal(res2.body)
            done()
          })
      });
  })



  describe('When using API', function () {
    var requestData = {url: "http://google.com", customKey: false},
        response;

    before(function (){
      request(app)
        .post('/api/v1/url')
        .send(requestData)
        .end(function (err, res) {
          expect(res.status).to.equal(200);
          response = res
        })
    })

    it('should have a valid URL', function () {
      expect(response.body.uri).to.exist;
    })
  })
});

var assert = require('chai').assert,
    expect = require('chai').expect,
    hash = require('../index.js').hash;

describe('Hashing function', function(){

  it('returns 0 for empty string',function(){
    assert.equal(hash(""), 0);
  });

  it('returns the same value for same input',function (){
    var input = "https://github.com/CestDiego/shortenuh",
        hash1 = hash(input),
        hash2 = hash(input);
    expect(hash1).to.equal(hash2);
  });

  it('accepts UTF-8', function () {
    var input = "https://github.com/search?utf8=✓&q=lol";
    return expect(hash(input)).to.exist;
  })

  it('returns different value for different inputs',function (){
    var input1 = "https://github.com/CestDiego/shortenuh",
        input2 = "https://github.com/syl20bnr/shortenuh";

    expect(hash(input1)).to.not.equal(hash(input2));
  });

})

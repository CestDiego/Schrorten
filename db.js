var db = {
  data: {},
  save: function (uri, urlObject) {
    this.data[uri] = urlObject
  },
  get: function (uri) {
    return this.data[uri];
  }

}

module.exports = db

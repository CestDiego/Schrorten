var db = {
  data: {},
  save: function (uri, url) {
    this.data[uri] = url
  },
  get: function (uri) {
    return this.data[uri];
  }

}

module.exports = db

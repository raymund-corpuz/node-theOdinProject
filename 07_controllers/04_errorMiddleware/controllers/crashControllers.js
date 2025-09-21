function crashController(req, res) {
  throw new Error("Something went wrong ❌");
}

module.exports = { crashController };

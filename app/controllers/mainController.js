const { Tag } = require("../models/");

const mainController = {
  homePage: async (req, res) => {
    req.session.score = 0;
    try {
      const tags = await Tag.findAll();
      res.render("index", { tags });
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  },
};

module.exports = mainController;

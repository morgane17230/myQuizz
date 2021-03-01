const { Tag } = require("../models/");

const mainController = {
  homePage: async (_, res) => {
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

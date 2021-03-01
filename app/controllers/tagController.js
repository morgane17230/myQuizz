const { Tag } = require("../models");

exports.getTag = async (req, res) => {
    try {
        const tag = await Tag.findByPk(Number(req.params.id), {
          include: [
            {
              association: "quizzes",
              include: ["author"],
            },
          ],
        });
        res.render("tag", { tag });
      } catch (err) {
        console.trace(err);
        res.status(500).send(err);
      }
};

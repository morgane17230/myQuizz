const { User } = require("../models/user");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

exports.signupPage = (_, res) => {
  res.render("signup");
};
exports.loginPage = (_, res) => {
  res.render("login");
};
exports.profilPage = (_, res) => {
  res.render("profil");
};

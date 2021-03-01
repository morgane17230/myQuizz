require("dotenv").config();
const express = require("express");
const router = require("./app/router");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: false }));

const session = require("express-session");

app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SECRET_SESSION,
  })
);

app.use((req, _, next) => {
  if (!req.session.results) req.session.results = [];
  if (!req.session.score) req.session.score = 0;
  if (!req.session.answers) req.session.answers = [];
  page = Number(req.query.page || 1, 30);
  next();
});

app.use(router);

app.use((_, res) => {
  res.render("404");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server listening on ${port}`));

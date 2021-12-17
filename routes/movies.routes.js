// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Movie = require("../models/Movie.model");

// Create new movie
router.get("/movies/create", (req, res, next) => {
    res.render("movies/new-movie");
  });

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch(() => res.render('movies/new-movie'));
});












module.exports = router;
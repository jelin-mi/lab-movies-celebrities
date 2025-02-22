// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
// all your routes here
const Movie = require("../models/Movie.model");

// Create new movie
router.get("/movies/create", (req, res, next) => {
  Celebrity.find().then((celebritiesFromDB) => {
    res.render("movies/new-movie", { celebritiesFromDB });
  });
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })

    .then(() => res.redirect("/movies"))
    .catch(() => res.render("movies/new-movie"));
});

// List of movies
router.get("/movies", (req, res, next) => {
  Movie.find({})
    .then((movies) => res.render("movies/movies", { movies }))
    .catch((error) => {
      next(error);
    });
});

// Movie's detail page
router.get("/movies/:id", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movieDetail) => res.render("movies/movie-details", { movieDetail }))
    .catch((error) => {
      next(error);
    });
});

// Delete movie
router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndDelete(id)
    .then(() => res.redirect("/movies"))
    .catch((error) => {
      next(error);
    });
});

// Edit movie
router.get("/movies/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    const celebrities = await Celebrity.find();
    res.render("movies/edit-movie", { movie: movie, celebrities: celebrities });
  } catch (e) {
    next(e);
  }
});

router.post("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => res.redirect(`/movies/${id}`))
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
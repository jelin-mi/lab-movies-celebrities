// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Celebrity = require("../models/Celebrity.model");

// Create new celebrity
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch(() => res.render("celebrities/new-celebrity"));
});

// List celebrities
router.get("/celebrities", (req, res, next) => {
  Celebrity.find({})
    .then((celebrities) =>
      res.render("celebrities/celebrities", { celebrities })
    )
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
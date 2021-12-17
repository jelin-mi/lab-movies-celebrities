const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: Array,    // Array of object IDs referencing the Celebrity model (basically, the array of celebrities' IDs)
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
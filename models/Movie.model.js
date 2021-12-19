const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrity' }],    // Array of object IDs referencing the Celebrity model (basically, the array of celebrities' IDs)
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
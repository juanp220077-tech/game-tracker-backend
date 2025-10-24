const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game', // Referencia al modelo Game
        required: [true, 'La reseña debe estar asociada a un juego']
    },
    author: {
        type: String,
        default: 'Usuario GameTracker' // Nombre del autor de la reseña
    },
    content: {
        type: String,
        required: [true, 'El contenido de la reseña es obligatorio']
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0 // Puntuación que el usuario da en la reseña
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', ReviewSchema);
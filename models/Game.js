const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título del juego es obligatorio'],
        trim: true,
        unique: true 
    },
    coverUrl: {
        type: String,
        default: 'placeholder_url_para_portada_generica.jpg' // URL de la imagen de portada
    },
    status: {
        type: String,
        enum: ['Pendiente', 'Jugando', 'Completado'], // Estado del juego
        default: 'Pendiente'
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0 // Puntuación con estrellas (0 a 5)
    },
    hoursPlayed: {
        type: Number,
        default: 0
    },
    platform: {
        type: String,
        trim: true
    },
    // Referencia a las reseñas (opcional, pero buena práctica)
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, {
    timestamps: true // Añade campos createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Game', GameSchema);
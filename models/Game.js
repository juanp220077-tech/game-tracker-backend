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
        default: 'placeholder_url_para_portada_generica.jpg'
    },
    status: {
        type: String,
        enum: ['Pendiente', 'Jugando', 'Completado'],
        default: 'Pendiente'
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    hoursPlayed: {
        type: Number,
        default: 0
    },
    platform: {
        type: String,
        trim: true
    },
    // **********************************************
    // ********* CAMPO AGREGADO (Genre) ************
    // **********************************************
    genre: {
        type: String,
        trim: true,
        default: 'N/A' // Valor por defecto si no se envía
    },
    
    // Referencia a las reseñas (opcional, pero buena práctica)
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Game', GameSchema);
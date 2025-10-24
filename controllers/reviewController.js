const Review = require('../models/Review');
const Game = require('../models/Game'); // Necesario para actualizar el juego

// 1. Obtener todas las reseñas de un juego (Read)
exports.getReviewsByGameId = async (req, res) => {
    try {
        // Encuentra reseñas donde el campo 'game' coincida con el gameId de la URL
        const reviews = await Review.find({ game: req.params.gameId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener las reseñas', error: error.message });
    }
};

// 2. Crear una nueva reseña (Create)
exports.createReview = async (req, res) => {
    try {
        const { gameId } = req.params;
        // Combina el body de la petición con el gameId obtenido de la ruta
        const newReview = await Review.create({ ...req.body, game: gameId });

        // OPCIONAL: Actualizar el array 'reviews' en el modelo Game
        await Game.findByIdAndUpdate(gameId, {
            $push: { reviews: newReview._id }
        });

        res.status(201).json({ success: true, data: newReview });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Datos incompletos o inválidos para la reseña', error: error.message });
    }
};

// 3. Eliminar una reseña (Delete)
exports.deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);

        if (!deletedReview) {
            return res.status(404).json({ success: false, message: 'Reseña no encontrada' });
        }

        // OPCIONAL: Eliminar la referencia del juego
        await Game.findByIdAndUpdate(deletedReview.game, {
             $pull: { reviews: deletedReview._id }
        });

        res.status(200).json({ success: true, message: 'Reseña eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar la reseña', error: error.message });
    }
};
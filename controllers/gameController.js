const Game = require('../models/Game');

// 1. Obtener todos los juegos (Read - All)
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.find().sort({ title: 1 }); // Ordenar alfabéticamente
        res.status(200).json({ success: true, data: games });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los juegos', error: error.message });
    }
};

// 2. Crear un nuevo juego (Create)
exports.createGame = async (req, res) => {
    try {
        const newGame = await Game.create(req.body);
        res.status(201).json({ success: true, data: newGame });
    } catch (error) {
        // Manejar error de validación de Mongoose
        res.status(400).json({ success: false, message: 'Datos incompletos o inválidos', error: error.message });
    }
};

// 3. Obtener un juego por ID (Read - One)
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ success: false, message: 'Juego no encontrado' });
        }
        res.status(200).json({ success: true, data: game });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
    }
};

// 4. Actualizar un juego por ID (Update)
exports.updateGame = async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Devuelve el documento actualizado
            runValidators: true // Ejecuta las validaciones de Mongoose
        });

        if (!updatedGame) {
            return res.status(404).json({ success: false, message: 'Juego no encontrado para actualizar' });
        }

        res.status(200).json({ success: true, data: updatedGame });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al actualizar el juego', error: error.message });
    }
};

// 5. Eliminar un juego por ID (Delete)
exports.deleteGame = async (req, res) => {
    try {
        const deletedGame = await Game.findByIdAndDelete(req.params.id);

        if (!deletedGame) {
            return res.status(404).json({ success: false, message: 'Juego no encontrado para eliminar' });
        }

        // Lógica adicional: Eliminar todas las reseñas asociadas a este juego (buena práctica)
        // await Review.deleteMany({ game: req.params.id }); 

        res.status(200).json({ success: true, message: 'Juego eliminado con éxito', data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el juego', error: error.message });
    }
};
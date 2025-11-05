// backend/controllers/gameController.js

const Game = require('../models/Game'); // Asume que tienes un modelo Game creado

// **********************************************
// ********* 1. LEER TODOS (GET /api/games) ********
// **********************************************
exports.getAllGames = async (req, res) => {
    // ESTA FUNCIÓN RESUELVE EL ERROR SI SE USABA EN LA LÍNEA 8 DE gameRoutes.js
    try {
        // Lógica para aplicar filtros (search, status, sort)
        const { search, status, sort } = req.query;
        let filter = {};
        let sortCriteria = {};

        // Filtro de búsqueda por título
        if (search) {
            filter.title = { $regex: search, $options: 'i' }; 
        }

        // Filtro por estado
        if (status) {
            filter.status = status;
        }

        // Criterio de ordenamiento
        if (sort) {
            // Ejemplo: Ordenar por 'title' o '-hoursPlayed' (descendente)
            if (sort === 'rating') sortCriteria.rating = -1;
            else if (sort === 'hoursPlayed') sortCriteria.hoursPlayed = -1;
            else sortCriteria.title = 1;
        }

        const games = await Game.find(filter).sort(sortCriteria);
        res.status(200).json({ success: true, data: games });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al obtener los juegos: ' + error.message });
    }
};

// **********************************************
// ********* 2. CREAR (POST /api/games) *********
// **********************************************
exports.createGame = async (req, res) => {
    // ESTA FUNCIÓN ES LA MÁS PROBABLE CAUSA DEL ERROR EN gameRoutes.js (Línea 11)
    try {
        const newGame = new Game(req.body);
        const savedGame = await newGame.save();
        res.status(201).json({ success: true, data: savedGame });
    } catch (error) {
        // 400 Bad Request si el modelo falla las validaciones
        res.status(400).json({ success: false, error: 'Error al crear el juego: ' + error.message });
    }
};

// **********************************************
// ********* 3. LEER POR ID (GET /api/games/:id) *********
// **********************************************
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ success: false, error: 'Juego no encontrado' });
        }
        res.status(200).json({ success: true, data: game });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// **********************************************
// ********* 4. ACTUALIZAR (PUT /api/games/:id) *********
// **********************************************
exports.updateGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Devuelve el documento modificado
            runValidators: true // Aplica las validaciones del esquema
        });
        if (!game) {
            return res.status(404).json({ success: false, error: 'Juego no encontrado para actualizar' });
        }
        res.status(200).json({ success: true, data: game });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Error al actualizar: ' + error.message });
    }
};

// **********************************************
// ********* 5. ELIMINAR (DELETE /api/games/:id) *********
// **********************************************
exports.deleteGame = async (req, res) => {
    try {
        const deletedGame = await Game.findByIdAndDelete(req.params.id);
        if (!deletedGame) {
            return res.status(404).json({ success: false, error: 'Juego no encontrado para eliminar' });
        }
        // 204 No Content es estándar para DELETE exitoso
        res.status(204).json({ success: true, data: {} }); 
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
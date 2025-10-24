const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController'); // Importa los controladores

// Rutas para /api/games

// 1. GET /api/games: Obtener todos los juegos
// 2. POST /api/games: Crear un nuevo juego
router.route('/')
    .get(gameController.getAllGames) 
    .post(gameController.createGame);

// Rutas para /api/games/:id

// 3. GET /api/games/:id: Obtener un juego por ID
// 4. PUT /api/games/:id: Actualizar un juego por ID
// 5. DELETE /api/games/:id: Eliminar un juego por ID
router.route('/:id')
    .get(gameController.getGameById)
    .put(gameController.updateGame) 
    .delete(gameController.deleteGame);

module.exports = router;
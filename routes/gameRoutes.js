// backend/routes/gameRoutes.js

const express = require('express');
const router = express.Router();

// Importa el objeto controlador que contiene todas las funciones de CRUD
const gameController = require('../controllers/gameController'); 

// RUTA BASE: /api/games

// 1. OBTENER TODOS LOS JUEGOS Y APLICAR FILTROS (GET /api/games?search=...)
// Usa gameController.getAllGames
router.get('/', gameController.getAllGames);

// 2. CREAR UN NUEVO JUEGO (POST /api/games)
// CRÍTICO: La función que probablemente fallaba antes. Usa gameController.createGame
router.post('/', gameController.createGame); 

// RUTA DINÁMICA: /api/games/:id
// Esta ruta maneja el ID del juego

// 3. OBTENER JUEGO POR ID (GET /api/games/:id)
// Necesario para cargar los datos en FormularioJuego.jsx al editar
router.get('/:id', gameController.getGameById);

// 4. ACTUALIZAR JUEGO (PUT /api/games/:id)
router.put('/:id', gameController.updateGame);

// 5. ELIMINAR JUEGO (DELETE /api/games/:id)
router.delete('/:id', gameController.deleteGame);


module.exports = router;
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController'); 

// Rutas que dependen del ID del juego:
// GET: /api/reviews/bygame/60c72b1f8e... (Obtener reseñas)
// POST: /api/reviews/bygame/60c72b1f8e... (Crear reseña)
router.route('/bygame/:gameId')
    .get(reviewController.getReviewsByGameId) 
    .post(reviewController.createReview);

// Rutas que usan el ID de la reseña:
// DELETE: /api/reviews/60c72b1f8e... (Eliminar reseña)
// Nota: El requisito incluye editar reseñas, por lo que una ruta PUT podría ser necesaria aquí.
router.delete('/:id', reviewController.deleteReview);
// Para editar: router.put('/:id', reviewController.updateReview); 

module.exports = router;
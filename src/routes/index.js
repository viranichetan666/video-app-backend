const express = require('express');
const router = express.Router();

const indexController = require('../controllers');

/**
 * Create Movie
 */
router.post('/', indexController.create);
/**
 * Update Movie by Id
 */
router.put('/:id', indexController.update);
/**
 * Get Movies
 */
router.get('/', indexController.list);
/**
 * Get Movie by Id
 */
router.get('/:id', indexController.getById);
/**
 * Delete Movie by Id
 */
router.delete('/:id', indexController.delete);

module.exports = router;
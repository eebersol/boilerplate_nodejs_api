'use strict'

const express               = require('express');
const router                = express.Router();
const exempleController     = require('../controllers/controller.exemple');

/**
 * @route GET /document/
 * @group document - Operations about document
 * @returns {object}    200 - Authorized documents
 * @returns {Error}     400 - Bad request
 * @returns {Error}     default - Unexpected error
 */
router.get('/',
    exempleController.get);

/**
 * @route GET /document/by/:id
 * @group document - Operations about document
 * @returns {object} 200 - Authorized documents
 * @returns {Error} 400 - Bad request
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id',
    exempleController.getBy);
/**
 * @route PUT /document/:id
 * @group document - Operations about document
 * @returns {object}    204 - updated document
 * @returns {Error}     400 - Bad request
 * @returns {Error}     default - Unexpected error
 */
router.put('/:id',
    exempleController.putBy);

/**
 * @route DELETE /document/:id
 * @group document - Operations about document
 * @returns {object}    204
 * @returns {Error}     400 - Bad request
 * @returns {Error}     default - Unexpected error
 */
router.delete('/:id',
    exempleController.deleteBy);

/**
 * @route POST /document
 * @group document - Operations about document
 * @returns {object}    201 - created document
 * @returns {Error}     400 - Bad request
 * @returns {Error}     default - Unexpected error
 */
router.post('/',
    exempleController.post);

module.exports = router;
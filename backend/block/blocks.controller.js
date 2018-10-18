const express = require('express');
const router = express.Router();
const blockService = require('./block.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);

module.exports = router;

function create(req, res, next) {
    blockService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function getAll(req, res, next) {
    blockService.getAll()
        .then(blocks => res.json(blocks))
        .catch(err => next(err));
}


function getById(req, res, next) {
    blockService.getById(req.params.id)
        .then(block => block ? res.json(block) : res.sendStatus(404))
        .catch(err => next(err));
}
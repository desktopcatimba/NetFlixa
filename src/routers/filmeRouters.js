const express = require('express')
const router = express.Router()
const controller = require('../controllers/filmeControllers')


router.get('/',controller.getAll)

router.get('/:id',controller.getById)

router.post('/',controller.create)

router.put('/:id',controller.Update)

router.delete('/:id',controller.deletar)

module.exports = router
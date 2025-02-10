import express from 'express'
import { concertController } from '../../controllers'

export const router = express.Router({
    strict: true
})

router.get('/', concertController.findAll)
router.get('/:id', concertController.findById)
router.post('/', concertController.create)
router.put('/:id', concertController.upsert)
router.delete('/:id', concertController.delete)

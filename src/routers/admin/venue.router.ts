import express from 'express'
import { venueController } from '../../controllers'

export const router = express.Router({
    strict: true
})

router.get('/', venueController.findAll)
router.get('/:id', venueController.findById)
router.post('/', venueController.create)
router.put('/:id', venueController.upsert)
router.delete('/:id', venueController.delete)

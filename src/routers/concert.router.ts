import express from 'express';
import { concertController } from '../controllers';

export const router = express.Router({
    strict: true
});

router.get('/', concertController.findAllUpcoming)
router.get('/:id', concertController.findById)

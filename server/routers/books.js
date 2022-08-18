import { Router } from 'express'
import book from '../controllers/book.js'

const router = new Router()

router.post('/', book.add)
router.get('/', book.getAll)
router.get('/subscribe', book.subscribe)
router.get('/:id', book.getOne)
router.put('/:id', book.update)

export default router


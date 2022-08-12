import { Router } from 'express'
import book from '../controllers/book.js'

const router = new Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Book:
 *          type: object
 *          required:
 *              - title
 *              - autor
 *          properties:
 *              _id:
 *                  type: string
 *                  description: Уникальный идентификатор записи
 *              title:
 *                  type: string
 *                  description: Заголовок книги
 *              autor:
 *                  type: string
 *                  description: Автор книги
 *              price:
 *                  type: string
 *                  description: Цена
 *          example:
 *              _id: 62f2add963f1ecd1d4a03455
 *              title: Дети капитана Гранта
 *              autor: Жюль Верн
 *              price: 2000
 */

router.post('/', book.add)
router.get('/', book.getAll)
router.get('/:id', book.getOne)
router.put('/:id', book.update)

export default router


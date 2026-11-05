import express from 'express';
import { GetBookByIdHandler, GetBooksHandler } from "./controller/books.js";

const router = express.Router();


/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all Books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Books returned successfully
 *       500:
 *         description: Unable to retrieve books       
 */
router.get('/books', GetBooksHandler);

/**
 * @openapi
 * /book/{id}:
 *   get:
 *     summary: Get one book by id
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom book id, such as b1
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to retrieve book
 */
router.get('/book/:id', GetBookByIdHandler);

export default router;
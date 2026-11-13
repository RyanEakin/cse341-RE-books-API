import express from 'express';
import { DeleteBookByIdHandler, GetBookByIdHandler, GetBooksHandler, PostBookHandler, PutBookByIdHandler } from "./controller/books.js";
import { RemoveBookById, UpdateBookById } from './models/books.js';

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

/**
 * @openapi
 * /books:
 *   post:
 *     summary: create a new book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom book id, such as b1
 *         schema:
 *           type: string
 *       - in: path
 *         name: authorId
 *         required: true
 *         description: The custom book id, such as b1
 *         schema:
 *           type: string
 *       - in: path
 *         name: title
 *         required: true
 *         description: The custom book id, such as b1
 *         schema:
 *           type: string
 *       - in: path
 *         name: publicationDate
 *         required: true
 *         description: The custom book id, such as b1
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 *       500:
 *         description: Unable to create book
 */
router.post('/books', PostBookHandler);


/**
 * @openapi
 * /book/{id}:
 *   put:
 *     summary: create a new book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom book id, such as b1
 *         schema:
 *           type: string
 *       - in: path
 *         name: authorId
 *         required: true
 *         description: The custom book id, such as b1
 *         schema:
 *           type: string
 *       - in: path
 *         name: title
 *         required: true
 *         description: The custom book id, such as b1
 *         schema:
 *           type: string
 *       - in: path
 *         name: publicationDate
 *         required: true
 *         description: The custom book id, such as b1
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: if a required field is missing or authorId does not match an existing author
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to retrieve book
 */
router.put('/book/:id', PutBookByIdHandler);


/**
 * @openapi
 * /book/{id}:
 *   delete:
 *     summary: remove one book by id
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
 *       204:
 *         description: Book removed successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Unable to retrieve book
 */
router.delete('/book/:id', DeleteBookByIdHandler);

export default router;
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
 *     summary: Create a book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               bookId:
 *                 type: string
 *                 example: b4
 *               authorId:
 *                 type: string
 *                 example: a4
 *               title:
 *                 type: string
 *                 example: test-book
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: "1990-08-21"
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: required field is missing
 *       409:
 *         description: id already exists
 *       500:
 *         description: Unable to create book
 */
router.post('/books', PostBookHandler);


/**
 * @openapi
 * /book/{id}:
 *   put:
 *     summary: Update a book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: b4
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authorId:
 *                 type: string
 *                 example: a4
 *               title:
 *                 type: string
 *                 example: test-book
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: "1995-09-30"
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: A required field is missing or invalid
 *       404:
 *         description: Book not found or authorId does not match an existing author
 *       500:
 *         description: Unable to update book
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
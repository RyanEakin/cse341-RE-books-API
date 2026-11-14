import express from 'express';
import { GetBookByIdHandler, GetBooksHandler } from "./controller/books.js";
import { GetAuthorsHandler, GetAuthorByIdHandler, PostAuthorHandler, PutAuthorByIdHandler, DeleteAuthorByIdHandler } from './controller/authors.js';

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





/////////////////////////////////////
//                                 //
//         Authors Routes          //
//                                 //
/////////////////////////////////////

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all Authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: Authors returned successfully
 *       500:
 *         description: Unable to retrieve authors       
 */
router.get('/authors', GetAuthorsHandler);

/**
 * @openapi
 * /author/{id}:
 *   get:
 *     summary: Get one author by id
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom author id, such as a1
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author returned successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to retrieve author
 */
router.get('/author/:id', GetAuthorByIdHandler);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - name
 *               - birthYear
 *             properties:
 *               authorId:
 *                 type: string
 *                 example: a4
 *               name:
 *                 type: string
 *                 example: test-author
 *               birthYear:
 *                 type: string
 *                 format: date
 *                 example: "1990"
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: required field is missing
 *       409:
 *         description: id already exists
 *       500:
 *         description: Unable to create author
 */
router.post('/authors', PostAuthorHandler);


/**
 * @openapi
 * /author/{id}:
 *   put:
 *     summary: Update a author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: a4
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: test-author
 *               birthYear:
 *                 type: string
 *                 format: date
 *                 example: "1995"
 *     responses:
 *       200:
 *         description: Author returned successfully
 *       400:
 *         description: A required field is missing or invalid
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to update author
 */
router.put('/author/:id', PutAuthorByIdHandler);


/**
 * @openapi
 * /author/{id}:
 *   delete:
 *     summary: remove one author by id
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom author id, such as a1
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author removed successfully
 *       404:
 *         description: Author not found
 *       409:
 *         description: Author still has Books attributed
 *       500:
 *         description: Unable to retrieve author
 */
router.delete('/author/:id', DeleteAuthorByIdHandler);

export default router;
import { getAllBooks, getBookById, CreateBook, UpdateBookById, RemoveBookById} from '../models/books.js';

const GetBooksHandler = async(req,res) => {
    try {
        const bookList = await getAllBooks();
        return res.status(200).json(bookList);

    } catch (error) {
        console.error('GET /books failed:', error.message);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const GetBookByIdHandler = async(req,res) => {
    const bookId = req.params.id;

    try {
        const book = await getBookById(bookId);
        
        if (!book) {
        return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);

    } catch (error) {
        console.error('GET /book/:id failed:', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }
};

const PostBookHandler = async(req,res) => {

    const {bookId, authorId, title, publicationDate} = req.body;
    
    //console.log(bookId);
    //console.log(authorId);
    //console.log(title);
    //console.log(publicationDate);
    //used to verify that req.body is indeed collecting the needed data

    try {
        if (!bookId || !authorId || !title || !publicationDate) {
            return res.status(400).json({message: 'required field is missing'});
        };

        const bookCheck = await getBookById(bookId) || "";
        // checks to see if the bookId already exists. also makes it empty if it doesn't

        console.log(bookCheck);
        //used to verify that the same bookId won't be used for duplicate records

        if (bookCheck.id === bookId) {
            return res.status(409).json({message: "bookId already exists"});
        }

        //if (authorId) {
        //    return res.status(404).json({message: "authorId does not match and existing author"});
        //}

        //test-values for CreateBook = "b4","a4","test-book","1990-08-21"
        const book = await CreateBook(bookId,authorId,title,publicationDate);
        return res.status(201).json(book);

    } catch (error) {
        console.error('POST /books failed:', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }
};

const PutBookByIdHandler = async(req,res) => {
    const bookId = req.params.id;
    const {authorId, title, publicationDate} = req.body;

    try {
        if (!bookId) {
            return res.status(400).json({message: 'required field is missing'});
        }; // gotta remember that this is for REQUIRED fields only, NOT optional ones!

        const bookCheck = await getBookById(bookId);
        // checks to see if the bookId already exists. also makes it empty if it doesn't
        
        if (!bookCheck) {
        return res.status(404).json({ message: 'Book not found' });
        }

        // test values for UpdateBody = "b4","a4","test-book","1990-09-23"
        const updateOp = await UpdateBookById(bookId,authorId,title,publicationDate);
        return res.status(200).json(updateOp);

    } catch (error) {
        console.error('PUT /book/:id failed:', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }
};

const DeleteBookByIdHandler = async(req,res) => {
    const bookId = req.params.id;

    console.log(bookId);

    try {
        const book = await getBookById(bookId);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const removeOp = await RemoveBookById(bookId);
        return res.status(204).send();

    } catch (error) {
        console.error('DELETE /book/:id failed:', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }
};

export {GetBooksHandler, GetBookByIdHandler, PostBookHandler, PutBookByIdHandler, DeleteBookByIdHandler};
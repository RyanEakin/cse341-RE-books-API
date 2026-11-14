import { getDb } from "../db/connect.js";

const getAllBooks = async () => {
    const books = await getDb().collection('books').find({}).toArray();
    return books;
};
// moved this from server.js to collect ALL books in the database

const getBookById = async (bookId) => {
    const book = await getDb().collection('books').findOne({ id: bookId });
    return book;
}; //this collects the book/record from the MongoDB database by it's bookId

const CreateBook = async (bookId, authorId, title, pubDate) => {
    const book = await getDb().collection('books').insertOne({id: bookId, authorId: authorId, title: title, publicationDate: pubDate});

    const updatedBook = await getBookById(bookId);
    const returnedBook = {"id":updatedBook.bookId, "authorId":updatedBook.authorId, "title":updatedBook.title, "publicationDate":updatedBook.publicationDate};

    return returnedBook;
}; //this creates the book/record for the MongoDB database by it's required values

const UpdateBookById = async (bookId, authorId, title, pubDate) => {
    const bookCheck = await getBookById(bookId);
    const book = await getDb().collection('books').updateOne( {id: bookId}, {$set: {authorId: authorId || bookCheck.authorId, title: title || bookCheck.title, publicationDate: pubDate || bookCheck.publicationDate }} );

    const updatedBook = await getBookById(bookId);
    const returnedBook = {"authorId":updatedBook.authorId, "title":updatedBook.title, "publicationDate":updatedBook.publicationDate};

    return returnedBook;
}; //this updates the book/record for the MongoDB database


const RemoveBookById = async (bookId) => {
    const book = await getDb().collection('books').deleteOne({ id: bookId });
}; //this removes the book/record for the MongoDB database

export { getAllBooks, getBookById, CreateBook, UpdateBookById, RemoveBookById};
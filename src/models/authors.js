import { getDb } from "../db/connect.js";

const getAllAuthors = async () => {
    const authors = await getDb().collection('authors').find({}).toArray();
    return authors;
};
// moved this from server.js to collect ALL authors in the database

const getAuthorById = async (authorId) => {
    const author = await getDb().collection('authors').findOne({ authorId: authorId });
    return author;
}; //this collects the author/record from the MongoDB database by it's authorId

const CreateAuthor = async (authorId, name, pubDate) => {
    const author = await getDb().collection('authors').insertOne({authorId: authorId, name: name, birthYear: pubDate});

    const updatedAuthor = await getAuthorById(authorId);
    const returnedAuthor = {"authorId":updatedAuthor.authorId, "name":updatedAuthor.name, "birthYear":updatedAuthor.birthYear};

    return returnedAuthor;
}; //this creates the author/record for the MongoDB database by it's required values

const UpdateAuthorById = async (authorId, name, birthYear) => {
    const authorCheck = await getAuthorById(authorId);
    const author = await getDb().collection('authors').updateOne( {authorId: authorId}, {$set: {name: name || authorCheck.name, birthYear: birthYear || authorCheck.birthYear }} );

    const updatedAuthor = await getAuthorById(authorId);
    const returnedAuthor = {"name":updatedAuthor.name, "birthYear":updatedAuthor.birthYear};

    return returnedAuthor;
}; //this updates the author/record for the MongoDB database


const RemoveAuthorById = async (authorId) => {
    const author = await getDb().collection('authors').deleteOne({ authorId: authorId });
}; //this removes the author/record for the MongoDB database

export { getAllAuthors, getAuthorById, CreateAuthor, UpdateAuthorById, RemoveAuthorById};
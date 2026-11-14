import { getAllAuthors, getAuthorById, CreateAuthor, UpdateAuthorById, RemoveAuthorById, AuthorhasAttribution } from "../models/authors.js";

const GetAuthorsHandler = async(req,res) => {
    try {
        const authorList = await getAllAuthors();
        return res.status(200).json(authorList);

    } catch (error) {
        console.error('GET /authors failed:', error.message);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const GetAuthorByIdHandler = async(req,res) => {
    const authorId = req.params.id;

    try {
        const author = await getAuthorById(authorId);
        
        if (!author) {
        return res.status(404).json({ message: 'author not found' });
        }

        return res.status(200).json(author);

    } catch (error) {
        console.error('GET /author/:id failed:', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }
};

const PostAuthorHandler = async(req,res) => {
    const {authorId, name, birthYear} = req.body;
    
    //console.log(authorId);
    //console.log(name);
    //console.log(birthYear);
    //used to verify that req.body is indeed collecting the needed data

    try {
        if (!authorId || !name || !birthYear) {
            return res.status(400).json({message: 'required field is missing'});
        };

        const authorCheck = await getAuthorById(authorId) || "";
        // checks to see if the authorId already exists. also makes it empty if it doesn't

        //console.log(authorCheck);
        //used to verify that the same authorId won't be used for duplicate records

        if (authorCheck.authorId === authorId) {
            return res.status(409).json({message: "authorId already exists"});
        }

        // work on above section when dealing with author-related-issue

        //test-values for CreateAuthor = "a4","Monica imilife","1990"
        const author = await CreateAuthor(authorId,name,birthYear);
        return res.status(201).json(author);

    } catch (error) {
        console.error('POST /authors failed:', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }
};

const PutAuthorByIdHandler = async(req,res) => {
    const authorId = req.params.id;
    const {name, birthYear} = req.body;

    try {
        if (!authorId) {
            return res.status(400).json({message: 'required field is missing'});
        }; // gotta remember that this is for REQUIRED fields only, NOT optional ones!

        const authorCheck = await getAuthorById(authorId);
        
        if (!authorCheck) {
            return res.status(404).json({message: "authorId does not match an existing author"});
        }


        // test values for UpdateBody = "a4","Jessica Besaide","1991"
        const updateOp = await UpdateAuthorById(authorId,name,birthYear);
        return res.status(200).json(updateOp);

    } catch (error) {
        console.error('PUT /author/:id failed:', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }
};

const DeleteAuthorByIdHandler = async(req,res) => {
    const authorId = req.params.id;

    //console.log(authorId);

    try {
        const author = await getAuthorById(authorId);
        
        if (!author) {
            return res.status(404).json({ message: 'author not found' });
        }

        const AttributionValue = await AuthorhasAttribution(authorId);

        if(AttributionValue) {//if the author HAS books then it will not delete the author
            return res.status(409).json({message: "Author still has Books attributed"});
        }

        const removeOp = await RemoveAuthorById(authorId);
        return res.status(204).send();

    } catch (error) {
        console.error('DELETE /author/:id failed:', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }
};

export {GetAuthorsHandler, GetAuthorByIdHandler, PostAuthorHandler, PutAuthorByIdHandler, DeleteAuthorByIdHandler};
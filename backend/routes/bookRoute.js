import express from 'express';
import {Book} from '../models/bookModel.js'
const router = express.Router();


// to post to mongoDB at /books
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// to get from mongoDB at /books
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// to get from mongoDB with id at /books/{id}
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const books = await Book.findById(id);

        return response.status(200).json(
            books
        );

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// To update values in mongoDB using id at /books/{id}
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'send all required fields: title, author, publishYear',
            });
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            throw { message: "id not Found" };
        }

        return response.status(200).send({ message: 'Book updated Successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//To delete values in MongoDB using id at /books/{id}
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            throw { message: "Id not found" };
        }
        response.status(200).send({ message: `Deleted record with id ${id}` });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
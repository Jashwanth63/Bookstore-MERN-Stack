import express, { response } from "express";
import {PORT, connectionString} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request Body
app.use(express.json());

// Option 1: Alllow all origins with default of cors(*)
app.use(cors());

//option 2: 
// allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost: 3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Tyoe'],
//     })
// );

// To get from /
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('welcome')
}); // To get a resource for the server

app.use('/books', booksRoute);


// To connect to the MongoDB database - Mongoose is the API used to connect to MongoDB
mongoose.connect(connectionString).then(() => {
    console.log("App connected to the database");
    app.listen(PORT, () => {
        console.log(`Running in: ${PORT}`);
    });    
})
.catch((error) => {
    console.log(error);
});


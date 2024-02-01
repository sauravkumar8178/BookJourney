import express from "express";
import {book as bookModels} from "../models/bookModels.js";

const router = express.Router();

//Route for save a new book
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            response.status(400).send({message: 'Send all required fields: title, author, publishYear',});
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const createBook = await bookModels.create(newBook);
        return response.status(201).send(createBook);
    }
    catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


//Route for Get all book from database
router.get("/", async (request, response) =>{
    try{
        const findBook = await bookModels.find({});
        return response.status(200).json({
            count: findBook.length,
            data: findBook
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


//Route for Get all book from database by id
router.get("/:id", async (request, response) =>{
    try{
        const {id} = request.params;
        const findBook = await bookModels.findById(id);
        return response.status(200).json(findBook);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for update a Book
router.put("/:id", async (request, response) =>{
    try{
        if(
            !request.body.title,
            !request.body.author,
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }
        const {id} = request.params;
        const result = await bookModels.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book update successfully'});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for delete a book
router.delete("/:id", async (request, response) =>{
    try{
        const {id} = request.params;
        const deleteResult = await bookModels.findByIdAndDelete(id);
        if (!deleteResult){
            return response.status(404).json({message: 'Book not find'});
        }
        return response.status(200).json({message: "Book delete successfully"});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;
import express, { request, response } from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { book as bookModels } from "./models/bookModels.js";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";


const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
// First options to implement the CORS
app.use(cors());

/*Second options to implement the CORS
app.use(
    cors({
        origin: "http://localhost:5555/",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
       allowedHeaders: ['Content-Type'],
    })
); */

// checking network connection
app.get('/', (request, response) =>{
    console.log(request);
    return response.status(234).send("Welcome to Book Store");
});

//Use book router
app.use("/book", bookRoute);

// checking database connection
mongoose
    .connect(mongodbURL)
    .then(() =>{
        console.log('App connected to database');
        app.listen(PORT, () =>{
            console.log("App is listening to port: ${PORT}");
        });
    })
    .catch((error) =>{
        console.log(error);
    }); 


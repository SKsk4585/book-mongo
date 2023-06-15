import express, { NextFunction, Request, Response, Router, request } from "express"
import { BookModel } from "../4-models/books-model"
import booksLogic from "../5-logic/books-logic"

const router = express.Router()

//get all books

router.get("/books", async (request:Request, respons:Response, next:NextFunction) =>{
    try {
        const books = await booksLogic.getAllBooks()
        respons.json(books)
        
    } 
    catch (err) {
        next(err)        
    }
})

//get-all-genre
router.get("/genre", async (request:Request, respons:Response, next:NextFunction) =>{
    try {
        const genre = await booksLogic.getAllGenre()
        respons.json(genre)
        
    } 
    catch (err) {
        next(err)        
    }
})
//add book
router.post("/books", async (request:Request, respons:Response, next:NextFunction) =>{
    try {
        const book = new BookModel(request.body)
        const newBook = await booksLogic.addBook(book)
        respons.json(newBook)
        
    } 
    catch (err) {
        next(err)        
    }
})

//get book by genre
router.get("/books/:genreId", async (request:Request, respons:Response, next:NextFunction) =>{
    try {
        const genreId = request.params.genreId
        const books = await booksLogic.getBookByGenre(genreId)
        respons.json(books)
        
    } 
    catch (err) {
        next(err)        
    }
})

//delete book
router.delete("/book/:_id", async (request: Request, respons: Response, next: NextFunction) =>{
    try {
        const _id = request.params._id
        await booksLogic.deleteBook(_id)
        respons.sendStatus(204)        
    } 
    catch (err) {
        next (err)
        
    }
})

export default router
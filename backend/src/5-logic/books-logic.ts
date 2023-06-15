import { BookModel, IBookModel } from "../4-models/books-model";

import { ResouceNotFoundErrorModel, ValidateErrorModel } from "../4-models/errorModel";
import { GenreModel, IGenreModel } from "../4-models/jenre-model";


function getAllBooks(): Promise<IBookModel[]>{
    return BookModel.find().exec()
}

function getAllGenre(): Promise<IGenreModel[]>{
    return GenreModel.find().exec()
}

function addBook(product:IBookModel): Promise<IBookModel>{
    const errors = product.validateSync()
    if (errors) throw new ValidateErrorModel (errors.message)
    return product.save()
}

function getBookByGenre(genreId:string): Promise<IBookModel[]>{
    return BookModel.find({ genreId }).populate("genre").exec();
}

async function deleteBook(_id: string): Promise<void> {
    const deleteProduct = await BookModel.findByIdAndDelete(_id)
    if (!deleteProduct) throw new ResouceNotFoundErrorModel(_id)
}

export default{
    getAllBooks,
    getAllGenre,
    addBook,
    getBookByGenre,
    deleteBook
}
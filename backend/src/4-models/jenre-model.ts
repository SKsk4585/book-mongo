import mongoose from "mongoose";

//1 interface
export interface IGenreModel extends mongoose.Document{
    genreName:string
}

//2 schema
export const CategorySchema = new mongoose.Schema<IGenreModel>({
    genreName:{
        type:String,
        required:[true, "name is required"],
        minlength:[2, "name must be at least 2 tharacters"],
        maxlength:[15, "name must be only 15 tharacters"]
    }
})

//3 model
 export const GenreModel = mongoose.model<IGenreModel>("GenreModel", CategorySchema, "genre")
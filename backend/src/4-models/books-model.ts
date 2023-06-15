import mongoose from "mongoose";
import { GenreModel } from "./jenre-model";


//1 interface
export interface IBookModel extends mongoose.Document{
    name:string
    Summary:string
    author:string
    releaseDate:string
    genreId:mongoose.Schema.Types.ObjectId
    price:Number
}

//2 schema
export const bookSchema = new mongoose.Schema<IBookModel>({
    name:{
        type:String,
        required:[true, "name is required"],
        minlength:[2, "name must be at least 2 tharacters"],
        maxlength:[15, "name must be only 15 tharacters"]
    }, 
    Summary:{
        type:String,
        required:[true, "Summary is required"],
        minlength:[2, "Summary must be at least 5 tharacters"],
        maxlength:[50, "name must be only 50 tharacters"]
    }, 
    author:{
        type:String,
        required:[true, "author is required"],
        minlength:[2, "author must be at least 2 tharacters"],
        maxlength:[50, "author must be only 50 tharacters"]
    }, 

    releaseDate:{
        type:String,
        required:[true, "releaseDate is required"],
    },


    genreId:{
        type:mongoose.Schema.Types.ObjectId,
     
    },

    price:{
        type:Number,
        required: [true, "price is required"],
        nim:[0, "price can't be negative"],
        max:[2000, "price can't be more than 2000$"],

     
    }
},{
    versionKey:false,
    toJSON:{virtuals:true},
    id:false
})

bookSchema.virtual("genre", {
    ref: GenreModel,
    localField:"genreId",
    foreignField: "_id",
    justOne: true

})

//3 model
 export const BookModel = mongoose.model<IBookModel>("BookModel", bookSchema, "book")
const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'A tour must have a name'],
        unique: true //this means we cannot have the same tour document with the same name 
    },  
    duration:{
        type:Number,
        required: true
    },
    maxGroupSize:{
        type: Number,
        required: true
    },
    difficulty:{
        type: String,
        required:true
    },
    ratingAverage:{
        type:Number,
        default:4.5
    },
    ratingQuantity:{
        type: Number,
        default: 0
    },
    price:{
        type: Number,
        required:[true, 'A tour must have a price']
    },
    priceDiscount:Number,
    summary:{
        type: String,
        trim: true,
        required:[true, 'A tour must have a description']
    },
    description:{
        type:String,
        trim: true
    },
    imageCover:{
        type:String,
        required:[true, 'must have a cover image']
    },
    images:[String],
    createdAt:{
        type:Date,
        default: Date.now()
        },
    startDate:[Date]
    
})

const Tour = mongoose.model('Tour', tourSchema)


module.exports = Tour;


// testTour.save().then(doc=>{
//     console.log(doc)
// }).catch(err => console.log(err, 'Error hrtr'))
const mongoose = require('mongoose');
const slugify = require('slugify');


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
    startDate:[Date],
    slug :String,
    secreTour:{
        type:Boolean,
        default: false
    }
    
})

const Tour = mongoose.model('Tour', tourSchema)

//let learn mongoose middleware
//DOCUMENT MIDDLEWARE
tourSchema.pre('save', function(){
    this.slug = slugify(this.name,  {lower:true});  // TO MAKE THIS FUNCTION, WE NEED TO INSTALL SLUGIFY npm i slugify and import it
    next();
})

//QUERY MIDDLEWARE
tourSchema.pre('/^find/', function(next){
this.find({secreTour: {$ne : true}})
})


module.exports = Tour;


// testTour.save().then(doc=>{
//     console.log(doc)
// }).catch(err => console.log(err, 'Error hrtr'))
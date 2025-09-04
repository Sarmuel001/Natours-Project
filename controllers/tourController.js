const Tour = require('../Model/tourModel');
console.log(Tour)

exports.getAllTours = async (req, res) => { 
  try{
    //after a long learning, now let learn Query
    //1A) BUILD QUERY
    const queryObj ={ ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el])
    
    //1B) ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    console.log(JSON.parse(queryStr))
    
    let query = Tour.find(JSON.parse(queryStr));
    ///2 SORTING
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortBy)
    } else{
      query = query.sort('-createdAt')
    }

    //3 FIELD LIMITS
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query=query.select('-__v'); //this remove the _v that use to show in database during the result
    } 

    //4 PAGINATION
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    
    query = query.skip(skip).limit(limit);
    
    if(req.query.page){
      const numTours = await Tour.countDocuments();
      if(skip >= numTours) 
        throw new Error ('This page doesnt exist')
    }

    const tours = await query;
    //const Tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  }catch(err) {
    console.error('Error in getAllTours:', err); 
    res.status(400).json({
      status: 'failed',
      message: err.message || 'error getting tours'
    });
  }
};

exports.createTour = async (req,res)=>{
  console.log(Tour)
  try{
    const newTour =  await Tour.create(req.body);
     res.status(200).json({
       status:'success',
       data:{
        newTour
       }
     })
  }catch(err){
    console.log(err)
    res.status(400).json({
      status:'failed',
      message:'error creating tour'
    })
  }
}

exports.getTour = async(req,res)=>{
try{
  const oneTour = await Tour.findById(req.params.id);
  res.status(200).json({
    status:'success',
    data:{
      oneTour
    }
  })
}catch(err){
    res.status(404).json({
    status:'failed',
    message: err
  })
}
}

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
   // if (!tour) return res.status(404).json({ status: 'fail', message: 'No tour found' });
    res.status(200).json({ 
      status: 'success', 
      data: { 
        tour 
      }});
  } catch (err) {
    res.status(400).json({ 
      status: 'fail', 
      message: err.message 
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id, req.body, { 
      new: true, 
      runValidators: true });
      res.status(204).json({
        status: 'success',
        data: null
      });
     } catch (err) {
    res.status(400).json({ 
      status: 'fail', 
      message: err.message 
    });
  }
};




//All the below code were used to test a json file, now they are no longer needed#\ln
//MongoDb dont really need all these to function 
// const fs = require('fs');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
//   //console.log(`Tour id is: ${val}`);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price'
//     });
//   }
//   next();
// };

// exports.getAllTours = (req, res) => {
//   console.log(req.requestTime);

//   res.status(200).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     results: tours.length,
//     data: {
//       tours
//     }
//   });
// };

// exports.getTour = (req, res) => {
//   console.log(req.params);
//   const id = req.params.id * 1;

//   const tour = tours.find(el => el.id === id);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour
//     }
//   });
// };

// exports.createTour = (req, res) => {
//   // console.log(req.body);

//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);

//   tours.push(newTour);

//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     err => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour
//         }
//       });
//     }
//   );
// };

// exports.updateTour = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: '<Updated tour here...>'
//     }
//   });
// };

// exports.deleteTour = (req, res) => {
//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// };

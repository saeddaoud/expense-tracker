// import ErrorResponse from '../utils/errorResponse.js';
// const errorHandler = (err, req, res, next) => {
//   let error = { ...err };

//   if (err.name === 'ValidationError') {
//     console.log(err._message);
//     const message = err._message;
//     // console.log(message);
//     error = new ErrorResponse(message, 400);
//     // console.log(error);
//   }

//   console.log(err.name);

//   res.status(error.statusCode || 500).json({
//     error: error.message || 'Server Error',
//   });
// };

// export default errorHandler;
const notFound = (req, res, next) => {
  const error = new Error(`Not found-${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };

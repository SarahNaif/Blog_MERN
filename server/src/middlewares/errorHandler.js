

export const errorResponserHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode || 400;
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };


export const invalidPathHandler = (_req, _res, next) => {
    let error = new Error("Invalid Path");
    error.statusCode = 404;
    next(error);
  };




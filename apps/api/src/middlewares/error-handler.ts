import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  // Handle specific error types
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or missing authentication token',
    });
  }

  if (err.name === 'SyntaxError' && 'body' in err) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid JSON payload',
    });
  }

  // Default error response
  const statusCode = (err as any).statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal Server Error' 
    : err.message;

  res.status(statusCode).json({
    error: 'Internal Server Error',
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};
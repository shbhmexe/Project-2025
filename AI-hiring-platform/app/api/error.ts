import { NextResponse } from 'next/server';

/**
 * Global error handler for API routes
 * This function can be used to wrap API route handlers to catch and handle errors
 */
export function withErrorHandler(handler: Function) {
  return async (req: Request, ...args: any[]) => {
    try {
      return await handler(req, ...args);
    } catch (error) {
      console.error('API Error:', error);
      
      // Determine if this is a known error type
      if (error instanceof Error) {
        return NextResponse.json(
          { 
            error: 'An error occurred while processing your request',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
          }, 
          { status: 500 }
        );
      }
      
      // Generic error response
      return NextResponse.json(
        { error: 'An unexpected error occurred' }, 
        { status: 500 }
      );
    }
  };
}

/**
 * Helper function to handle database connection errors
 * This can be used in API routes that interact with the database
 */
export function handleDatabaseError(error: any) {
  console.error('Database Error:', error);
  
  if (error.code === 'P1001') {
    return NextResponse.json(
      { error: 'Cannot reach database server' },
      { status: 503 }
    );
  }
  
  if (error.code === 'P1003') {
    return NextResponse.json(
      { error: 'Database does not exist' },
      { status: 500 }
    );
  }
  
  if (error.code === 'P2002') {
    return NextResponse.json(
      { error: 'A record with this value already exists' },
      { status: 409 }
    );
  }
  
  return NextResponse.json(
    { error: 'Database operation failed' },
    { status: 500 }
  );
} 
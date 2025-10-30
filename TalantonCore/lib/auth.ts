import { NextRequest } from 'next/server';

const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'admin-secret-key-123';

export function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  return apiKey === ADMIN_API_KEY;
}

export function unauthorizedResponse() {
  return new Response(
    JSON.stringify({ error: 'Unauthorized. Valid API key required.' }),
    {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

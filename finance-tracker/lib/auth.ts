import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function authenticatedRoute(handler: (request: Request, params: any) => Promise<NextResponse>) {
  return async (request: Request, params: any) => {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return handler(request, params);
  };
} 
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export async function getAuthSession() {
  return await getServerSession(authOptions);
}

export async function requireAuth(req: NextRequest, handler: (req: NextRequest) => Promise<NextResponse>) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  return handler(req);
} 
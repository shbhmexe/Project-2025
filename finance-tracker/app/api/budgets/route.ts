import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession, requireAuth } from '@/lib/auth';
import connectDB from '@/lib/db';
import Budget from '@/models/Budget';

// GET handler for fetching all budgets
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = session.user.id;
    const budgets = await Budget.find({ userId }).sort({ category: 1 });
    
    return NextResponse.json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 });
  }
}

// POST handler for creating a new budget
export async function POST(req: NextRequest) {
  return requireAuth(req, async (req) => {
    try {
      await connectDB();
      
      const session = await getAuthSession();
      const userId = session?.user.id;
      
      const data = await req.json();
      const budget = await Budget.create({ ...data, userId });
      
      return NextResponse.json(budget, { status: 201 });
    } catch (error) {
      console.error('Error creating budget:', error);
      return NextResponse.json({ error: 'Failed to create budget' }, { status: 500 });
    }
  });
} 
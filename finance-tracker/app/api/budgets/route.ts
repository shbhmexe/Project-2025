import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Budget from '@/models/Budget';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET /api/budgets
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = session.user.id;
    
    // Get query parameters
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const period = url.searchParams.get('period');
    
    // Build query
    const query: any = { userId };
    if (category) query.category = category;
    if (period) query.period = period;
    
    const budgets = await Budget.find(query).sort({ category: 1 });
    
    return NextResponse.json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 });
  }
}

// POST /api/budgets
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = session.user.id;
    const data = await req.json();
    
    // Validate required fields
    if (!data.category || !data.amount || !data.period) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Check if budget for this category already exists
    const existingBudget = await Budget.findOne({ category: data.category, userId });
    
    if (existingBudget) {
      // Update existing budget
      const updatedBudget = await Budget.findOneAndUpdate(
        { category: data.category, userId },
        { ...data, userId },
        { new: true }
      );
      
      return NextResponse.json(updatedBudget);
    } else {
      // Create new budget
      const budget = await Budget.create({
        ...data,
        userId,
      });
      
      return NextResponse.json(budget, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating budget:', error);
    return NextResponse.json({ error: 'Failed to create budget' }, { status: 500 });
  }
} 
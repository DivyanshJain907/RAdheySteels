import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Timeline } from '@/models/Timeline';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminSecret = request.headers.get('x-admin-secret');
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Validate required fields
    if (!body.heading || !body.year) {
      return NextResponse.json(
        { error: 'Missing required fields: heading and year are required' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    const result = await Timeline.findByIdAndUpdate(
      id,
      {
        heading: body.heading,
        year: parseInt(body.year),
        image: body.image || '',
      },
      { new: true }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Timeline entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Timeline PUT error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update timeline entry' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminSecret = request.headers.get('x-admin-secret');
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await dbConnect();
    const result = await Timeline.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { error: 'Timeline entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

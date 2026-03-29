import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Timeline } from '@/models/Timeline';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const entries = await Timeline.find().sort({ year: -1 });
    return NextResponse.json(entries);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminSecret = request.headers.get('x-admin-secret');
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const body = await request.json();

    // Validate required fields
    if (!body.heading || !body.year) {
      return NextResponse.json(
        { error: 'Missing required fields: heading and year are required' },
        { status: 400 }
      );
    }

    const entry = new Timeline({
      heading: body.heading,
      year: parseInt(body.year),
      image: body.image || '',
    });
    await entry.save();

    return NextResponse.json(entry, { status: 201 });
  } catch (error: any) {
    console.error('Timeline POST error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create timeline entry' },
      { status: 400 }
    );
  }
}

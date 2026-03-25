import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Timeline } from '@/models/Timeline';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminSecret = request.headers.get('x-admin-secret');
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const result = await Timeline.findByIdAndDelete(params.id);

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

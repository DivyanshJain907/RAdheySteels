import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Contact } from '@/models/Contact';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const adminSecret = request.headers.get('x-admin-secret');

    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const body = await request.json();

    const allowedUpdates = {
      seen: typeof body.seen === 'boolean' ? body.seen : undefined,
      status: typeof body.status === 'string' ? body.status : undefined,
      priority: typeof body.priority === 'string' ? body.priority : undefined,
      notes: typeof body.notes === 'string' ? body.notes : undefined,
      followUpAt:
        body.followUpAt === null || typeof body.followUpAt === 'string'
          ? body.followUpAt
          : undefined,
    };

    const payload = Object.fromEntries(
      Object.entries(allowedUpdates).filter(([, value]) => value !== undefined)
    );

    const updatedContact = await Contact.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedContact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedContact);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update contact' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const adminSecret = request.headers.get('x-admin-secret');

    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete contact' },
      { status: 500 }
    );
  }
}

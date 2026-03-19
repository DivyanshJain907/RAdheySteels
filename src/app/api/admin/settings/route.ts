import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Settings } from '@/models/Settings';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin123';

export async function GET(request: NextRequest) {
  const token = request.headers.get('x-admin-secret');

  if (token !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const settings = await Settings.find();

    const settingsObj: Record<string, any> = {};
    settings.forEach((setting) => {
      settingsObj[setting.key] = setting.value;
    });

    return NextResponse.json(settingsObj);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const token = request.headers.get('x-admin-secret');

  if (token !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await request.json();

    // Save or update each setting
    const keys = Object.keys(body);
    for (const key of keys) {
      await Settings.findOneAndUpdate(
        { key },
        { value: body[key] },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ success: true, message: 'Settings saved successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}

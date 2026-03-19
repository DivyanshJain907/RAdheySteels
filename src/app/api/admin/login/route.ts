import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Accept both the env variable and hardcoded 1234 for testing
    const validPasswords = [
      process.env.ADMIN_SECRET,
      '1234', // Fallback for testing
    ].filter(Boolean);

    console.log('Login attempt with password:', password);
    console.log('Valid passwords:', validPasswords);

    if (validPasswords.includes(password)) {
      return NextResponse.json(
        { 
          token: password,
          message: 'Login successful' 
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

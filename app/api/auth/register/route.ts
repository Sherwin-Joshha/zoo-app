import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json();
    
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const assignedRole = role === 'admin' ? 'admin' : 'visitor';
    const password_hash = await bcrypt.hash(password, 10);

    const [result]: any = await pool.execute(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, password_hash, assignedRole]
    );

    const userId = result.insertId;

    const payload = { id: userId, name, email, role: assignedRole };
    const token = await signToken(payload);

    const response = NextResponse.json({ success: true, user: payload });
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    return response;
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { signToken } from '@/lib/auth';

export async function POST() {
  try {
    const guestId = uuidv4().substring(0, 8);
    const name = 'Guest';
    const email = `guest_${guestId}@guest.zoo.com`;
    const password = uuidv4(); // random unguessable password
    const role = 'visitor';

    const password_hash = await bcrypt.hash(password, 10);

    const [result]: any = await pool.execute(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, password_hash, role]
    );

    const userId = result.insertId;
    const payload = { id: userId, name, email, role };
    const token = await signToken(payload);

    const response = NextResponse.json({ success: true, user: payload });
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Guest login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

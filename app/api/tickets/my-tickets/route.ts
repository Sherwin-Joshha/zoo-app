import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [rows]: any = await pool.execute(
      'SELECT * FROM tickets WHERE user_id = ? ORDER BY created_at DESC',
      [session.id as any]
    );

    return NextResponse.json({ success: true, tickets: rows });
  } catch (error) {
    console.error('Fetch tickets error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const [rows]: any = await pool.execute(
      'SELECT * FROM animals WHERE id = ?',
      [params.id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, animal: rows[0] });
  } catch (error) {
    console.error('Error fetching animal:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

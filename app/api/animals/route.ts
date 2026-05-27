import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const zone = searchParams.get('zone');

    let query = 'SELECT * FROM animals WHERE 1=1';
    const params: any[] = [];

    if (category && (category === 'bird' || category === 'mammal' || category === 'reptile')) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (zone) {
      query += ' AND zone = ?';
      params.push(zone);
    }

    query += ' ORDER BY name ASC';

    const [rows]: any = await pool.execute(query, params);

    return NextResponse.json({ success: true, animals: rows });
  } catch (error) {
    console.error('Error fetching animals:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const query = `
      SELECT e.*, IFNULL(SUM(earn.amount), 0) as total_earnings
      FROM employees e
      LEFT JOIN employee_earnings earn ON e.id = earn.employee_id
      GROUP BY e.id
      ORDER BY e.name ASC
    `;

    const [employees]: any = await pool.execute(query);

    return NextResponse.json({ success: true, employees });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { name, email, role, salary, date_of_joining, status } = await request.json();

    if (!name || !email || !role || !salary || !date_of_joining) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [result]: any = await pool.execute(
      'INSERT INTO employees (name, email, role, salary, date_of_joining, status) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, role, salary, date_of_joining, status || 'available']
    );

    return NextResponse.json({ success: true, employee_id: result.insertId });
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

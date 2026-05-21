import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month') || (new Date().getMonth() + 1).toString();
    const year = searchParams.get('year') || new Date().getFullYear().toString();

    const query = `
      SELECT 
        e.id as employee_id, 
        e.name, 
        e.role,
        e.salary as base_salary,
        IFNULL(SUM(CASE WHEN earn.source = 'commission' THEN earn.amount ELSE 0 END), 0) as ticket_commission,
        (e.salary + IFNULL(SUM(CASE WHEN earn.source = 'commission' THEN earn.amount ELSE 0 END), 0)) as total_earnings
      FROM employees e
      LEFT JOIN employee_earnings earn 
        ON e.id = earn.employee_id 
        AND MONTH(earn.date) = ? 
        AND YEAR(earn.date) = ?
      GROUP BY e.id
      ORDER BY total_earnings DESC
    `;

    const [earnings]: any = await pool.execute(query, [month, year]);

    return NextResponse.json({ success: true, earnings });
  } catch (error) {
    console.error('Error fetching earnings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

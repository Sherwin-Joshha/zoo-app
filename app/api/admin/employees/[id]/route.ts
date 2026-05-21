import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const [empRows]: any = await pool.execute('SELECT * FROM employees WHERE id = ?', [params.id]);
    if (empRows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const [attendanceRows]: any = await pool.execute('SELECT * FROM attendance WHERE employee_id = ? ORDER BY date DESC', [params.id]);
    const [earningsRows]: any = await pool.execute('SELECT * FROM employee_earnings WHERE employee_id = ? ORDER BY date DESC', [params.id]);
    
    const [stats]: any = await pool.execute(`
      SELECT 
        SUM(amount) as total_earnings,
        SUM(CASE WHEN source = 'commission' THEN amount ELSE 0 END) as tickets_commission
      FROM employee_earnings WHERE employee_id = ?
    `, [params.id]);

    return NextResponse.json({ 
      success: true, 
      employee: empRows[0],
      attendance: attendanceRows,
      earnings: earningsRows,
      stats: {
        total_earnings: stats[0]?.total_earnings || 0,
        tickets_commission: stats[0]?.tickets_commission || 0,
        days_present_this_month: attendanceRows.filter((a: any) => new Date(a.date).getMonth() === new Date().getMonth()).length
      }
    });
  } catch (error) {
    console.error('Error fetching employee:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    
    const { role, status, current_task } = await request.json();
    
    await pool.execute(
      'UPDATE employees SET role = ?, status = ?, current_task = ? WHERE id = ?',
      [role, status, current_task, params.id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating employee:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    
    const { current_task } = await request.json();
    const newStatus = current_task ? 'on_task' : 'available';

    await pool.execute(
      'UPDATE employees SET current_task = ?, status = ? WHERE id = ?',
      [current_task, newStatus, params.id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error assigning task:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

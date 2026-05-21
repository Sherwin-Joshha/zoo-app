import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const { searchParams } = new URL(request.url);
    const employee_id = searchParams.get('employee_id');
    const date = searchParams.get('date');

    let query = `
      SELECT a.*, e.name as employee_name, e.status as current_status
      FROM attendance a
      JOIN employees e ON a.employee_id = e.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (employee_id) {
      query += ` AND a.employee_id = ?`;
      params.push(employee_id);
    }
    if (date) {
      query += ` AND a.date = ?`;
      params.push(date);
    }

    query += ` ORDER BY a.date DESC, a.login_time DESC`;

    const [attendance]: any = await pool.execute(query, params);
    
    // Also fetch employees for manual log form
    const [employees]: any = await pool.execute(`SELECT id, name, status FROM employees ORDER BY name ASC`);

    return NextResponse.json({ success: true, attendance, employees });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const { employee_id, type, date, time } = await request.json(); 

    const targetDate = date || new Date().toISOString().split('T')[0];
    
    // Convert time manually to MySQL timestamp if provided, else current time
    let targetTime;
    if (date && time) {
      targetTime = `${date} ${time}:00`;
    } else {
      // Use exact current timestamp matching MySQL format
      const now = new Date();
      targetTime = now.toISOString().slice(0, 19).replace('T', ' ');
    }

    if (type === 'login') {
      const [existing]: any = await pool.execute(
        'SELECT id FROM attendance WHERE employee_id = ? AND date = ?',
        [employee_id, targetDate]
      );
      if (existing.length > 0) {
        return NextResponse.json({ error: 'Employee already logged in for this date' }, { status: 400 });
      }
      
      await pool.execute(
        'INSERT INTO attendance (employee_id, date, login_time) VALUES (?, ?, ?)',
        [employee_id, targetDate, targetTime]
      );
      
      await pool.execute('UPDATE employees SET status = "available" WHERE id = ?', [employee_id]);
    } else if (type === 'logout') {
      // We allow updating the latest open attendance record for the date
      await pool.execute(
        'UPDATE attendance SET logout_time = ? WHERE employee_id = ? AND date = ? AND logout_time IS NULL',
        [targetTime, employee_id, targetDate]
      );
      await pool.execute('UPDATE employees SET status = "off_duty", current_task = NULL WHERE id = ?', [employee_id]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging attendance:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const status = searchParams.get('status');

    let query = `
      SELECT t.*, COALESCE(t.visitor_name, u.name) as visitor_name, u.email as visitor_email 
      FROM tickets t
      LEFT JOIN users u ON t.user_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (date) {
      query += ` AND t.visit_date = ?`;
      params.push(date);
    }
    if (status && status !== 'all') {
      query += ` AND t.status = ?`;
      params.push(status);
    }

    query += ` ORDER BY t.created_at DESC`;

    const [tickets]: any = await pool.execute(query, params);

    const [statsResult]: any = await pool.execute(`
      SELECT 
        COUNT(*) as total_tickets,
        SUM(total_price) as total_revenue
      FROM tickets
    `);

    const todayDate = new Date().toISOString().split('T')[0];
    const [todayResult]: any = await pool.execute(`
      SELECT SUM(adult_count + child_count) as today_visitors
      FROM tickets
      WHERE visit_date = ? AND status = 'valid'
    `, [todayDate]);

    const [chartData]: any = await pool.execute(`
      SELECT DATE(created_at) as date, COUNT(*) as count, SUM(total_price) as revenue
      FROM tickets
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) ASC
    `);

    const [empResult]: any = await pool.execute(`
      SELECT COUNT(*) as count FROM employees WHERE status = 'available'
    `);

    return NextResponse.json({ 
      success: true, 
      tickets,
      stats: {
        total_tickets: statsResult[0]?.total_tickets || 0,
        total_revenue: statsResult[0]?.total_revenue || 0,
        today_visitors: todayResult[0]?.today_visitors || 0,
        available_employees: empResult[0]?.count || 0,
      },
      chartData
    });
  } catch (error) {
    console.error('Error fetching admin tickets:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

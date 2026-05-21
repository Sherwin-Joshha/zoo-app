import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { adult_count, child_count, visit_date } = body;
    const user_id = body.user_id || session.id;

    if (adult_count === undefined || child_count === undefined || !visit_date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const adults = parseInt(adult_count, 10);
    const children = parseInt(child_count, 10);

    if (adults < 0 || children < 0 || (adults === 0 && children === 0)) {
      return NextResponse.json({ error: 'Invalid ticket counts' }, { status: 400 });
    }

    const total_price = (adults * 500) + (children * 250);
    const ticket_id = uuidv4();
    
    // Generate QR Code containing ticket_id
    const qr_data = JSON.stringify({ ticket_id, visit_date, total_price });
    const qr_code = await QRCode.toDataURL(qr_data);

    const [result]: any = await pool.execute(
      `INSERT INTO tickets (ticket_id, user_id, adult_count, child_count, total_price, visit_date, qr_code, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'valid')`,
      [ticket_id, user_id, adults, children, total_price, visit_date, qr_code]
    );

    // Distribute commission
    const [availableEmployees]: any = await pool.execute(
      `SELECT id FROM employees WHERE status = 'available'`
    );
    
    if (availableEmployees.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableEmployees.length);
      const selectedEmployeeId = availableEmployees[randomIndex].id;
      
      const todayDate = new Date().toISOString().split('T')[0];
      await pool.execute(
        `INSERT INTO employee_earnings (employee_id, date, amount, source) VALUES (?, ?, 50.00, 'commission')`,
        [selectedEmployeeId, todayDate]
      );
    }

    const newTicket = {
      id: result.insertId,
      ticket_id,
      user_id,
      adult_count: adults,
      child_count: children,
      total_price,
      visit_date,
      qr_code,
      status: 'valid'
    };

    return NextResponse.json({ success: true, ticket: newTicket });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

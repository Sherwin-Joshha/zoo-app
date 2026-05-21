import { NextResponse } from 'next/server';
import pool from '@/lib/db';

/*
CREATE TABLE IF NOT EXISTS contact_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  issue_type VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'resolved') DEFAULT 'pending'
);
*/

export async function POST(request: Request) {
  try {
    const { name, email, issue_type, message } = await request.json();

    if (!name || !email || !issue_type || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Ensure the table exists
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS contact_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        issue_type VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('pending', 'resolved') DEFAULT 'pending'
      )
    `);

    await pool.execute(
      'INSERT INTO contact_requests (name, email, issue_type, message) VALUES (?, ?, ?, ?)',
      [name, email, issue_type, message]
    );

    return NextResponse.json({ success: true, message: 'Your request has been submitted.' });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

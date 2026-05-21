import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
  try {
    const [zones]: any = await pool.execute('SELECT * FROM zones');
    const [animals]: any = await pool.execute('SELECT id, name, species, zone, image_filename FROM animals');

    const zonesWithAnimals = zones.map((zone: any) => {
      zone.animals = animals.filter((animal: any) => animal.zone === zone.zone_name);
      return zone;
    });

    return NextResponse.json({ success: true, zones: zonesWithAnimals });
  } catch (error) {
    console.error('Error fetching zones:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

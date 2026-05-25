'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addAnimal(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const species = formData.get('species') as string;
    const category = formData.get('category') as string;
    const habitat = formData.get('habitat') as string;
    const lifespan = parseInt(formData.get('lifespan') as string, 10);
    const diet = formData.get('diet') as string;
    const zone = formData.get('zone') as string;
    const image_filename = formData.get('image_filename') as string;
    const fun_fact = formData.get('fun_fact') as string;

    // Validate required fields
    if (!name || !species || !category || !zone) {
      return { success: false, error: 'Name, Species, Category, and Zone are required.' };
    }

    const query = `
      INSERT INTO animals 
      (name, species, category, habitat, lifespan, diet, zone, image_filename, fun_fact)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.execute(query, [
      name,
      species,
      category,
      habitat || null,
      isNaN(lifespan) ? null : lifespan,
      diet || null,
      zone,
      image_filename || null,
      fun_fact || null,
    ]);

    revalidatePath('/admin/animals/add');
    revalidatePath('/visitor/animals');
    return { success: true };
  } catch (error: any) {
    console.error('Error adding animal:', error);
    return { success: false, error: error.message || 'Failed to add animal' };
  }
}

export async function getZones() {
  try {
    const [rows] = await pool.query('SELECT id, zone_name FROM zones ORDER BY zone_name ASC');
    return rows as { id: number; zone_name: string }[];
  } catch (error) {
    console.error('Error fetching zones:', error);
    return [];
  }
}

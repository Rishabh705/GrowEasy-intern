import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const filePath:string = path.join(process.cwd(), 'src', 'data', 'banner.json');
        const file:string = await fs.readFile(filePath, 'utf8');
        const data:JSON = JSON.parse(file);
        return NextResponse.json({ data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to get data.' });
    }
};
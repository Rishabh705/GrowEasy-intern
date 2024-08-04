import fs from 'fs';
import path from 'path';
import { NextResponse } from "next/server";

export async function GET() {
    const imagesDir = path.join(process.cwd(), 'public');

    try {
        const files = await fs.promises.readdir(imagesDir);
        const imagePaths = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
        return NextResponse.json({data: imagePaths});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Failed to get images."});
    }
};
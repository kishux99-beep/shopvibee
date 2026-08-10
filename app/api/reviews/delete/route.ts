import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { id, adminPassword } = await request.json();

    // Security check: Yahan apna ek simple password set kar dein
    if (adminPassword !== "Krish@8865") {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
  }
}
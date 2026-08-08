import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { sendCategoryUpdateAlert } from '@/app/actions/subscriber';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Database mein deal save karna
    const newDeal = await prisma.deal.create({
      data: {
        title: body.title,
        category: body.category,
        price: body.price,
        link: body.link,
      },
    });

    // 2. Subscribed users ko automatic email alert bhejna
    await sendCategoryUpdateAlert(
      body.category,
      body.title,
      body.price,
      body.link
    );

    revalidatePath('/');

    return NextResponse.json({ success: true, deal: newDeal });
  } catch (error) {
    console.error('Error adding deal:', error);
    return NextResponse.json({ success: false, error: 'Failed to add deal' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 1. Saare real reviews fetch karne ke liye (GET request)
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, reviews })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

// 2. Naya review save karne ke liye (POST request)
export async function POST(request: Request) {
  try {
    const { name, role, rating, comment } = await request.json()

    if (!name || !comment) {
      return NextResponse.json({ success: false, error: 'Name and comment are required' }, { status: 400 })
    }

    // User ki IP nikalna taaki ek user ek hi review de sake
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1'
    const ipHash = Buffer.from(ip).toString('base64') // Simple hash for IP

    // Check karna ki kya is IP se pehle review aa chuka hai
    const existingReview = await prisma.review.findUnique({
      where: { ipHash },
    })

    if (existingReview) {
      return NextResponse.json({ success: false, error: 'Aap pehle hi ek review de chuke hain!' }, { status: 400 })
    }

    // Naya review save karna
    const newReview = await prisma.review.create({
      data: {
        name,
        role: role || 'ShopVibee Shopper',
        rating: Number(rating) || 5,
        comment,
        ipHash,
      },
    })

    return NextResponse.json({ success: true, review: newReview })
  } catch (error: any) {
    console.error('Review Error:', error)
    return NextResponse.json({ success: false, error: 'Aap pehle hi review submit kar chuke hain.' }, { status: 500 })
  }
}
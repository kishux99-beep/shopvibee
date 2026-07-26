'use server'

import { prisma } from '../lib/prisma'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// 1. Preferences अपडेट या नया Subscriber बनाने का Server Action
export async function updatePreferences(email: string, categories: string[]) {
  try {
    const formattedEmail = email.trim().toLowerCase()

    if (!formattedEmail || !formattedEmail.includes('@')) {
      return { success: false, error: 'कृपया सही ईमेल दर्ज करें।' }
    }

    // update की जगह upsert का उपयोग किया गया है
    // इससे "Record not found" का Prisma एरर नहीं आएगा
    const updated = await prisma.subscriber.upsert({
      where: { 
        email: formattedEmail 
      },
      update: {
        categories,
        isActive: true, // अगर पहले inactive था तो सक्रिय हो जाएगा
      },
      create: {
        email: formattedEmail,
        categories,
        isActive: true,
      },
    })

    // 🚀 Send Welcome / Confirmation Email via Resend
    try {
      await resend.emails.send({
        from: 'ShopVibee Deals <onboarding@resend.dev>',
        to: formattedEmail,
        subject: '🎉 Welcome to ShopVibee Deal Alerts!',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #4f46e5;">Aapki Deal Alert preferences save ho chuki hain!</h2>
            <p>Hum aapko aapki pasandida categories ke best discounts sabse pehle bhejenge:</p>
            <p style="background: #f3f4f6; padding: 10px; border-radius: 6px; font-weight: bold;">
              ${categories.join(', ')}
            </p>
            <br/>
            <p>Regards,</p>
            <p><b>Team ShopVibee</b></p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Resend Email Error:', emailError)
      // Email fail hone par bhi database update success maana jayega taaki user ka flow na ruke
    }

    revalidatePath('/')
    return { success: true, data: updated }
  } catch (error) {
    console.error('Update Preferences Error:', error)
    return { success: false, error: 'Preferences update करने में समस्या आई।' }
  }
}

// 2. Unsubscribe करने का Server Action
export async function unsubscribeUser(email: string) {
  try {
    const formattedEmail = email.trim().toLowerCase()

    if (!formattedEmail) {
      return { success: false, error: 'ईमेल मिलना आवश्यक है।' }
    }

    const updated = await prisma.subscriber.update({
      where: { 
        email: formattedEmail 
      },
      data: {
        isActive: false,
      },
    })

    revalidatePath('/')
    return { success: true, message: 'Unsubscribed successfully', data: updated }
  } catch (error) {
    console.error('Unsubscribe Error:', error)
    return { success: false, error: 'Unsubscribe करने में समस्या आई।' }
  }
}
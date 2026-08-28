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

    // Database upsert action
    const updated = await prisma.subscriber.upsert({
      where: { 
        email: formattedEmail 
      },
      update: {
        categories,
        isActive: true,
      },
      create: {
        email: formattedEmail,
        categories,
        isActive: true,
      },
    })

    // 🚀 Send Welcome / Confirmation Email via Resend Dashboard Template
    try {
      const emailResponse = await resend.emails.send({
        from: 'ShopVibee <noreply@shopvibee.in>',
        to: [formattedEmail],
        template: {
          id: 'welcome-to-shopvibee',
        },
      })

      console.log('Resend Success Response:', emailResponse)
    } catch (emailError: any) {
      console.error('Resend Email Error Detail:', JSON.stringify(emailError, null, 2))
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

    // 🚀 Send Unsubscribe Confirmation Email via Resend Dashboard Template
    try {
      const emailResponse = await resend.emails.send({
        from: 'ShopVibee <noreply@shopvibee.in>',
        to: [formattedEmail],
        template: {
          id: 'unsubscribed-from-shopvibee-2',
        },
      })

      console.log('Unsubscribe Email Success:', emailResponse)
    } catch (emailError: any) {
      console.error('Resend Unsubscribe Email Error Detail:', JSON.stringify(emailError, null, 2))
    }

    revalidatePath('/')
    return { success: true, message: 'Unsubscribed successfully', data: updated }
  } catch (error) {
    console.error('Unsubscribe Error:', error)
    return { success: false, error: 'Unsubscribe करने में समस्या आई।' }
  }
}

// 3. Category Update ya New Deal hone par Subscribed Users ko Email Alert bhejne ka Server Action
export async function sendCategoryUpdateAlert(
  category: string,
  dealTitle: string,
  dealPrice: string,
  dealLink: string
) {
  try {
    const subscribers = await prisma.subscriber.findMany({
      where: {
        isActive: true,
        categories: {
          has: category,
        },
      },
    })

    if (!subscribers || subscribers.length === 0) {
      return { success: true, count: 0, message: 'Is category ke liye koi subscriber nahi mila.' }
    }

    let successCount = 0

    // Sabhi active subscribers ko Resend Dashboard template ke dynamic data ke sath bhejein
    for (const sub of subscribers) {
      try {
       await resend.emails.send({
          from: 'ShopVibee <noreply@shopvibee.in>',
          to: [sub.email],
          template: {
            id: 'category-deal-alert-2',
            variables: {
              category,
              dealTitle,
              dealPrice,
              dealLink,
            },
          },
        })
        successCount++
      } catch (err) {
        console.error(`Failed to send email to ${sub.email}:`, err)
      }
    }

    return {
      success: true,
      count: successCount,
      message: `${successCount} subscribers ko email bhej di gayi hai!`,
    }
  } catch (error) {
    console.error('Send Category Update Alert Error:', error)
    return { success: false, error: 'Alert emails bhejne mein samasya aayi.' }
  }
}
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

    // 🚀 Send Welcome / Confirmation Email via Resend with Clean Light Wrapper Layout
    try {
      const emailResponse = await resend.emails.send({
        from: 'ShopVibee <noreply@shopvibee.in>',
        to: [formattedEmail],
        subject: '🎉 Welcome to ShopVibee Deal Alerts!',
        html: `
          <div style="background-color: #f3f4f6; padding: 30px 0; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              
              <!-- Logo Section -->
              <div style="text-align: center; margin-bottom: 24px;">
                <img src="https://shopvibee.in/logo.png" alt="ShopVibee Logo" style="width: 160px; height: auto; display: inline-block;" />
              </div>

              <!-- Content Heading -->
              <h2 style="color: #1f2937; font-size: 20px; text-align: center; margin-bottom: 16px;">
                Aapki Deal Alert preferences save ho chuki hain! 🎉
              </h2>
              
              <p style="color: #4b5563; font-size: 15px; line-height: 1.5; text-align: center; margin-bottom: 20px;">
                Hum aapko aapki pasandida categories ke best discounts sabse pehle bhejenge:
              </p>

              <!-- Categories Box -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 16px; border-radius: 8px; font-weight: bold; color: #374151; font-size: 14px; text-align: center; margin-bottom: 24px;">
                ${categories.join(', ')}
              </div>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />

              <!-- Footer -->
              <p style="color: #6b7280; font-size: 14px; margin-bottom: 4px;">Regards,</p>
              <p style="color: #1f2937; font-size: 14px; font-weight: bold; margin: 0;">Team ShopVibee</p>
            </div>
          </div>
        `,
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

    // 🚀 Send Unsubscribe Confirmation Email via Resend
    try {
      const emailResponse = await resend.emails.send({
        from: 'ShopVibee <noreply@shopvibee.in>',
        to: [formattedEmail],
        subject: '🔔 Unsubscribed from ShopVibee Deal Alerts',
        html: `
          <div style="background-color: #f3f4f6; padding: 30px 0; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              
              <!-- Logo Section -->
              <div style="text-align: center; margin-bottom: 24px;">
                <img src="https://shopvibee.in/logo.png" alt="ShopVibee Logo" style="width: 160px; height: auto; display: inline-block;" />
              </div>

              <!-- Content Heading -->
              <h2 style="color: #1f2937; font-size: 20px; text-align: center; margin-bottom: 16px;">
                Aap successfully unsubscribe ho chuke hain.
              </h2>
              
              <p style="color: #4b5563; font-size: 15px; line-height: 1.5; text-align: center; margin-bottom: 20px;">
                Humme khed hai ki aapko alvida kehna pad raha hai. Ab se aapko ShopVibee ki taraf se koi deal alerts nahi milenge.
              </p>

              <p style="color: #4b5563; font-size: 14px; line-height: 1.5; text-align: center; margin-bottom: 24px;">
                Agar aap kabhi dobara alerts receive karna chahein, toh aap hamari website par jaakar wapas subscribe kar sakte hain.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />

              <!-- Footer -->
              <p style="color: #6b7280; font-size: 14px; margin-bottom: 4px;">Regards,</p>
              <p style="color: #1f2937; font-size: 14px; font-weight: bold; margin: 0;">Team ShopVibee</p>
            </div>
          </div>
        `,
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
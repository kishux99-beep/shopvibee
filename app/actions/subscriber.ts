'use server'

import { prisma } from '../lib/prisma'
import { revalidatePath } from 'next/cache'

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
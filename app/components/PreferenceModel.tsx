'use client'

import { useState } from 'react'
// 1. अपने Server Actions को Import करें
import { updatePreferences, unsubscribeUser } from '@/app/actions/subscriber'

const ALL_CATEGORIES = [
  'Electronics & Tech',
  'Fashion & Apparel',
  'Home & Kitchen',
  'Beauty & Care',
  'Travel Deals',
]

interface PreferenceModalProps {
  email: string
  currentCategories?: string[]
  isOpen: boolean
  onClose: () => void
  onUnsubscribeSuccess: () => void
}

export default function PreferenceModal({
  email,
  currentCategories = [],
  isOpen,
  onClose,
  onUnsubscribeSuccess,
}: PreferenceModalProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(currentCategories)
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  // Category Toggle करने का लॉजिक
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  // 2. Preferences Update करने के लिए Server Action कॉल करना
  const handleUpdate = async () => {
    setLoading(true)
    
    // 🚀 Server Action call!
    const res = await updatePreferences(email, selectedCategories)
    
    setLoading(false)

    if (res.success) {
      alert('आपकी Preferences सफलतापूर्वक अपडेट हो गई हैं!')
      onClose()
    } else {
      alert(res.error || 'कुछ गड़बड़ हुई!')
    }
  }

  // 3. Unsubscribe करने के लिए Server Action कॉल करना
  const handleUnsubscribe = async () => {
    if (confirm('क्या आप सच में सभी अलर्ट्स बंद (Unsubscribe) करना चाहते हैं?')) {
      setLoading(true)
      
      // 🚀 Server Action call!
      const res = await unsubscribeUser(email)
      
      setLoading(false)

      if (res.success) {
        alert('आप सफलतापूर्वक Unsubscribe हो चुके हैं।')
        onUnsubscribeSuccess()
        onClose()
      } else {
        alert(res.error || 'Unsubscribe करने में समस्या आई।')
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl text-gray-800">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <div>
            <h2 className="text-xl font-bold">Preferences</h2>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold">
            ✕
          </button>
        </div>

        {/* Categories Checklist */}
        <div className="space-y-2 mb-6">
          <p className="font-semibold text-sm text-gray-700">अपनी पसंदीदा Categories चुनें:</p>
          {ALL_CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 p-2.5 rounded-xl border hover:bg-gray-50 cursor-pointer transition"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <span className="text-sm font-medium">{cat}</span>
            </label>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2.5 rounded-xl transition shadow-md"
          >
            {loading ? 'Saving...' : 'Update Preferences'}
          </button>

          <div className="flex justify-between items-center mt-2 pt-3 border-t">
            <button
              onClick={handleUnsubscribe}
              disabled={loading}
              className="text-red-500 hover:text-red-700 text-xs font-semibold"
            >
              Unsubscribe All Alerts
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xs"
            >
              Cancel
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
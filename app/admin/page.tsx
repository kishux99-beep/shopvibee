'use client'
import { useState } from 'react'

export default function AdminPage() {
  // Password state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passInput, setPassInput] = useState('')

  // Form states
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Supplements')
  const [price, setPrice] = useState('')
  const [link, setLink] = useState('')

  // Password check function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Yahan aap apna pasandida password rakh sakte hain
    if (passInput === 'Krish@8865') {
      setIsAuthenticated(true)
    } else {
      alert('Galat Password! Dobara koshish karein.')
      setPassInput('')
    }
  }

  const handlePublish = async () => {
    const res = await fetch('/api/add-deal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, price, link })
    })
    
    if (res.ok) {
      alert('Deal Published & Email Alerts Sent! 🚀')
      setTitle('')
      setPrice('')
      setLink('')
    } else {
      alert('Kuchh error aayi.')
    }
  }

  // 1. Agar login nahi hai, toh yeh password screen dikhegi
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-xl font-bold text-white mb-2 text-center">🔐 Admin Lock</h1>
          <p className="text-xs text-gray-400 text-center mb-6">Yeh area secure hai. Password darj karein.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password"
              className="border border-gray-700 bg-gray-950 text-white p-3 block w-full rounded-lg outline-none focus:border-blue-600 text-sm" 
              placeholder="Enter Admin Password..." 
              value={passInput} 
              onChange={(e) => setPassInput(e.target.value)} 
              required
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3.5 w-full rounded-lg transition text-sm">
              Unlock Panel 🔓
            </button>
          </form>
        </div>
      </div>
    )
  }

  // 2. Login hone ke baad asli Admin Dashboard dikhega
  return (
    <div className="min-h-screen bg-gray-950 p-10 flex flex-col items-center">
      <div className="max-w-xl w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Add New Deal</h1>
          <button 
            onClick={() => setIsAuthenticated(false)} 
            className="text-xs bg-red-950 text-red-400 border border-red-800 px-3 py-1.5 rounded-lg hover:bg-red-900 transition"
          >
            Lock Again 🔒
          </button>
        </div>
        
        <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Product Title</label>
        <input className="border border-gray-700 bg-gray-950 text-white p-3 block w-full mb-4 rounded-lg outline-none text-sm" placeholder="e.g. Creatine" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Category</label>
        <select 
          className="border border-gray-700 bg-gray-950 text-white p-3 block w-full mb-4 rounded-lg outline-none text-sm" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Supplements">Supplements</option>
          <option value="Fitness">Fitness</option>
          <option value="Electronics">Electronics</option>
          <option value="Wearables">Wearables</option>
          <option value="Home">Home</option>
        </select>

        <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Price</label>
        <input className="border border-gray-700 bg-gray-950 text-white p-3 block w-full mb-4 rounded-lg outline-none text-sm" placeholder="e.g. ₹610" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Deal Link</label>
        <input className="border border-gray-700 bg-gray-950 text-white p-3 block w-full mb-6 rounded-lg outline-none text-sm" placeholder="https://..." value={link} onChange={(e) => setLink(e.target.value)} />

        <button onClick={handlePublish} className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3.5 w-full rounded-lg transition text-sm">
          Publish Deal & Send Alerts 🚀
        </button>
      </div>
    </div>
  )
}
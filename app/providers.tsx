'use client'

import React from 'react'
import NextTopLoader from 'nextjs-toploader'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Yeh raha aapka smooth yellow loading bar */}
      <NextTopLoader 
        color="#EAB308" 
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #EAB308,0 0 5px #EAB308"
      />
      {children}
    </>
  )
}
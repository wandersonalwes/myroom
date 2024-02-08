'use client'

import { Suspense } from 'react'
import { PinForm } from './components/PinForm'

export default function PinPage() {
  return (
    <div className="min-h-screen flex justify-center items-center relative">
      <Suspense>
        <PinForm />
      </Suspense>
    </div>
  )
}

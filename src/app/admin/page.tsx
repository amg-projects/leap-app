'use client'

import { NavBar } from '../NavBar'

export default function AdminPage() {
  return (
    <div className="h-screen w-screen bg-background">
      <NavBar onSideBarToggle={() => {}} />

      <h1>Admin Page</h1>
    </div>
  )
}

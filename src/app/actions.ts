'use server'

import { redirect } from 'next/navigation'

export async function accessHome() {
  redirect('/')
}

export async function accessLive(id: string) {
  redirect(`/live/${id}`)
}

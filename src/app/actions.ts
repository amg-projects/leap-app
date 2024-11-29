'use server'

import { redirect } from 'next/navigation'

export async function accessHome() {
  redirect('/')
}

export async function accessLive(id: number) {
  redirect(`/live/${id}`)
}

'use client'

import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from '@wagmi/core'

import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function LeapTokenPage() {
  return (
    <div className="min-h-screen w-screen">
      <ConnectButton showBalance={false} />
    </div>
  )
}

import { WebRTCPlayer } from '@/components/WebRTCPlayer'

export function VideoPreview({ className }: { className?: string }) {
  console.log('VideoPreview render')
  return (
    <div
      className={`aspect-video rounded-2xl bg-[#c7d6cc] shadow-lg ${className}`}
    >
      <WebRTCPlayer streamId="not-implemented" />
    </div>
  )
}

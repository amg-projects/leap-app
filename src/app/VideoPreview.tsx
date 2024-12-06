import { AspectRatio } from '@/components/ui/aspect-ratio'
import { WebRTCPlayer } from '@/components/WebRTCPlayer'

export function VideoPreview({ className }: { className?: string }) {
  console.log('VideoPreview render')
  return (
    <AspectRatio ratio={16 / 9} className={className}>
      <div
        className={`aspect-video overflow-hidden rounded-2xl bg-[#c7d6cc] shadow-lg dark:bg-background`}
      >
        <WebRTCPlayer />
      </div>
    </AspectRatio>
  )
}

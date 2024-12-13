'use client'
import { DSFUReport } from '@/lib/protos/ts/report'

let lastTime = Date.now()
let mockReports = [
  DSFUReport.create({
    nodeID: randomUUID(),
    livestreams: [
      {
        spec: {
          livestreamID: randomUUID(),
          streamerID: randomUUID(),
          viewerIDs: [randomUUID()],
        },
        stats: { bytesReceived: 0, bytesSent: 0, quality: 0, uptime: 0 },
      },
    ],
  }),
  DSFUReport.create({
    nodeID: randomUUID(),
    livestreams: [
      {
        spec: {
          livestreamID: randomUUID(),
          streamerID: randomUUID(),
          viewerIDs: [randomUUID()],
        },
        stats: { bytesReceived: 0, bytesSent: 0, quality: 0, uptime: 0 },
      },
    ],
  }),
  DSFUReport.create({
    nodeID: randomUUID(),
    livestreams: [
      {
        spec: {
          livestreamID: randomUUID(),
          streamerID: randomUUID(),
          viewerIDs: [randomUUID()],
        },
        stats: { bytesReceived: 0, bytesSent: 0, quality: 0, uptime: 0 },
      },
    ],
  }),
  DSFUReport.create({
    nodeID: randomUUID(),
    livestreams: [
      {
        spec: {
          livestreamID: randomUUID(),
          streamerID: randomUUID(),
          viewerIDs: [randomUUID()],
        },
        stats: { bytesReceived: 0, bytesSent: 0, quality: 0, uptime: 0 },
      },
    ],
  }),
  DSFUReport.create({
    nodeID: randomUUID(),
    livestreams: [
      {
        spec: {
          livestreamID: randomUUID(),
          streamerID: randomUUID(),
          viewerIDs: [randomUUID()],
        },
        stats: { bytesReceived: 0, bytesSent: 0, quality: 0, uptime: 0 },
      },
    ],
  }),
  DSFUReport.create({
    nodeID: randomUUID(),
    livestreams: [
      {
        spec: {
          livestreamID: randomUUID(),
          streamerID: randomUUID(),
          viewerIDs: [randomUUID()],
        },
        stats: { bytesReceived: 0, bytesSent: 0, quality: 0, uptime: 0 },
      },
    ],
  }),
]

function randomUUID(): string {
  return Math.random().toString(36).substring(2)
}

export function tickMocks(): DSFUReport[] {
  const ellapsed = Date.now() - lastTime
  lastTime = Date.now()
  mockReports = mockReports.map((report) => {
    return {
      ...report,
      livestreams: report.livestreams.map((stream) => {
        const addOrRemove = Math.random() > 0.5 ? 'add' : 'remove'
        if (!stream.spec) {
          stream.spec = {
            livestreamID: randomUUID(),
            streamerID: randomUUID(),
            viewerIDs: [randomUUID()],
          }
        }

        if (stream.spec) {
          const olLength = stream.spec.viewerIDs.length
          if (addOrRemove === 'remove') {
            stream.spec.viewerIDs.pop()
          } else {
            stream.spec.viewerIDs.push(randomUUID())
          }
          console.log(
            `DSFUReport ${report.nodeID} stream ${stream.spec.livestreamID} ${
              addOrRemove === 'add' ? 'added' : 'removed'
            } viewer. Old length: ${olLength}, new length: ${
              stream.spec.viewerIDs.length
            }`,
          )
        }

        if (stream.stats) {
          stream.stats.bytesReceived += Math.random() * 100
          stream.stats.bytesSent +=
            Math.random() * 100 * stream.spec.viewerIDs.length
          stream.stats.uptime += ellapsed / 1000
          if (addOrRemove === 'add') {
            stream.stats.quality += Math.random()
          } else {
            stream.stats.quality -= Math.random()
          }

          if (stream.stats.quality < 0) {
            stream.stats.quality = 0
          }

          if (stream.stats.quality > 1) {
            stream.stats.quality = 1
          }
        }

        return stream
      }),
    }
  })

  console.dir(mockReports)
  return mockReports
}

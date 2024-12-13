'use client'
import { BaseNode } from '@/components/base-node'
import {
  Background,
  Controls,
  Edge,
  Handle,
  Node,
  NodeProps,
  Position,
  ReactFlow,
} from '@xyflow/react'
import { useEffect, useState } from 'react'
import { tickMocks } from './mock-reports'
import { DSFUReport } from '@/lib/protos/ts/report'

type Streamer = {
  id: string
  name: string
  type: 'streamer'
}

type ViewerCluster = {
  id: string
  name: string
  type: 'viewerCluster'
}

const accums = {
  streamer: 0,
  dsfu: 0,
  viewerCluster: 0,
}

const X_STEP = 700
const knownNodes: Record<string, Node> = {}

function createNode(origin: Streamer | DSFUReport | ViewerCluster): Node {
  let id
  if ('nodeID' in origin) {
    id = origin.nodeID
  } else {
    id = origin.id
  }

  let name
  if ('name' in origin) {
    name = origin.name
  } else {
    name = origin.nodeID
  }

  if (knownNodes[id]) {
    return knownNodes[id]
  }

  let type: 'streamer' | 'dsfu' | 'viewerCluster'
  if ('type' in origin) {
    type = origin.type
  } else {
    type = 'dsfu'
  }

  let x
  if (type === 'streamer') {
    x = 50
  } else if (type === 'dsfu') {
    x = 50 + X_STEP
  } else {
    x = 50 + X_STEP * 2
  }

  accums[type] += 1
  const accum = accums[type]
  const y = accum * 150

  const node: Node = {
    data: {
      label: `<${type}> ${name}`,
    },
    id,
    position: {
      x,
      y,
    },
    width: 300,
    style: {
      color: 'black',
    },
    type: 'customNode',
    zIndex: Math.floor(Math.random() * 100),
  }
  knownNodes[id] = node
  return node
}

type PreNodes = {
  streamers: (Streamer & DSFUReport['livestreams'][number])[]
  dsfus: DSFUReport[]
  viewerClusters: (ViewerCluster & DSFUReport['livestreams'][number])[]
}

function createPreNodes(report: DSFUReport): {
  preNodes: PreNodes
  edges: Edge[]
} {
  const preNodes: PreNodes = {
    streamers: report.livestreams.map((stream) => ({
      ...stream,
      type: 'streamer',
      id: stream.spec?.streamerID ?? 'unknown',
      name: stream.spec?.streamerID ?? 'unknown',
    })),
    dsfus: [{ ...report }],
    viewerClusters: report.livestreams.map((stream) => ({
      ...stream,
      type: 'viewerCluster',
      id: `${stream.spec?.streamerID}:${report.nodeID}-viewers`,
      name: `${stream.spec?.streamerID}:${report.nodeID}-viewers`,
    })),
  }

  const streamerEdges: Edge[] = preNodes.streamers.map((streamer) => ({
    id: `${streamer.name}-${report.nodeID}`,
    source: streamer.name,
    target: report.nodeID,
    animated: true,
    label: streamer.stats?.bytesReceived.toFixed(2) + ' MB',
  }))

  const viewerClusterEdges: Edge[] = preNodes.viewerClusters.map(
    (viewerCluster) => ({
      id: `${viewerCluster.name}-${report.nodeID}`,
      source: report.nodeID,
      target: viewerCluster.id,
      animated: true,
      label:
        viewerCluster.stats?.bytesSent.toFixed(2) +
        ' MB (quality: ' +
        viewerCluster.stats?.quality.toFixed(2) * 100 +
        '%, uptime: ' +
        viewerCluster.stats?.uptime.toFixed(0) +
        's, viewers: ' +
        viewerCluster.spec?.viewerIDs.length +
        ')',
    }),
  )

  return {
    preNodes,
    edges: [...streamerEdges, ...viewerClusterEdges],
  }
}

export default function AdminPage() {
  const [dsfus, setDsfus] = useState<DSFUReport[]>([])

  const results = dsfus.map(createPreNodes)
  const edges = results.map((result) => result.edges).flat()
  const preNodes = results
    .map((result) => result.preNodes)
    .map((preNodes) => [
      ...preNodes.streamers,
      ...preNodes.dsfus,
      ...preNodes.viewerClusters,
    ])
    .flat()

  // const preNodes: (Streamer | DSFU | ViewerCluster)[] = [
  //   { type: 'streamer', name: 'Marucs' },
  //   { type: 'streamer', name: 'Gary' },
  //   { type: 'streamer', name: 'Juninho' },
  //   ...dsfus,
  //   { type: 'viewerCluster', name: 'marucs-viewers' },
  //   { type: 'viewerCluster', name: 'gary-viewers' },
  //   { type: 'viewerCluster', name: 'juninho-viewers-1' },
  //   { type: 'viewerCluster', name: 'juninho-viewers-2' },
  // ]

  const nodes = preNodes.map(createNode)
  const nodeTypes = {
    customNode: CustomNode,
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDsfus(tickMocks())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="h-screen w-screen ">
      <div
        className="bg-white"
        style={{
          height: '100%',
        }}
      >
        <ReactFlow nodes={nodes} nodeTypes={nodeTypes} edges={edges}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}

function CustomNode({ data }: NodeProps) {
  return (
    <BaseNode>
      <>
        {data.label}
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </>
    </BaseNode>
  )
}

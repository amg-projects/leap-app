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

type Streamer = {
  name: string
  type: 'streamer'
}

type DLivestream = {
  streamerName: Streamer['name']
  viewers: number
}

type DSFU = {
  name: string
  type: 'dsfu'
  streams: DLivestream[]
}

type ViewerCluster = {
  name: string
  type: 'viewerCluster'
}

const accums = {
  streamer: 0,
  dsfu: 0,
  viewerCluster: 0,
}

const X_STEP = 400
const knownNodes: Record<string, Node> = {}

function createNode(origin: Streamer | DSFU | ViewerCluster): Node {
  const id = origin.name
  if (knownNodes[id]) {
    return knownNodes[id]
  }
  let x
  if (origin.type === 'streamer') {
    x = 50
  } else if (origin.type === 'dsfu') {
    x = 50 + X_STEP
  } else {
    x = 50 + X_STEP * 2
  }

  accums[origin.type] += 1
  const accum = accums[origin.type]
  const y = accum * 100

  const node: Node = {
    data: {
      label: `<${origin.type}> ${origin.name}`,
    },
    id: origin.name,
    position: {
      x,
      y,
    },
    width: 300,
    style: {
      color: 'black',
    },
    type: 'customNode',
  }
  knownNodes[id] = node
  return node
}

type PreNodes = {
  streamers: Streamer[]
  dsfus: DSFU[]
  viewerClusters: ViewerCluster[]
}

function createPreNodes(dsfu: DSFU): {
  preNodes: PreNodes
  edges: Edge[]
} {
  const preNodes: PreNodes = {
    streamers: dsfu.streams.map((stream) => ({
      type: 'streamer',
      name: stream.streamerName,
    })),
    dsfus: [dsfu],
    viewerClusters: dsfu.streams.map((stream) => ({
      type: 'viewerCluster',
      name: `${stream.streamerName}:${dsfu.name}-viewers`,
    })),
  }

  const streamerEdges: Edge[] = preNodes.streamers.map((streamer) => ({
    id: `${streamer.name}-${dsfu.name}`,
    source: streamer.name,
    target: dsfu.name,
    animated: true,
  }))

  const viewerClusterEdges: Edge[] = preNodes.viewerClusters.map(
    (viewerCluster) => ({
      id: `${viewerCluster.name}-${dsfu.name}`,
      source: dsfu.name,
      target: viewerCluster.name,
      animated: true,
    }),
  )

  return {
    preNodes,
    edges: [...streamerEdges, ...viewerClusterEdges],
  }
}

export default function AdminPage() {
  const dsfus: DSFU[] = [
    {
      type: 'dsfu',
      name: 'marucs-dsfu-1',
      streams: [
        { streamerName: 'Marucs', viewers: 1 },
        { streamerName: 'Juninho', viewers: 5 },
      ],
    },
    {
      type: 'dsfu',
      name: 'marucs-dsfu-2',
      streams: [{ streamerName: 'Gary', viewers: 2 }],
    },
    {
      type: 'dsfu',
      name: 'anonymous-dsfu-1',
      streams: [{ streamerName: 'Juninho', viewers: 2 }],
    },
  ]

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

  return (
    <div className="h-screen w-screen ">
      <div
        className="bg-white"
        style={{
          height: '100%',
        }}
      >
        {nodes.length}
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

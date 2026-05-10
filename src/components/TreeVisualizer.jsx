import { useEffect, useRef, useState } from "react"
import { tree } from "../store/treeStore"

function calculatePositions(
  node,
  depth = 0,
  x = 600,
  gap = 180,
  nodes = [],
  edges = []
) {

  if (!node) return { nodes, edges }

  const currentNode = {
    ...node,
    isLatest: node.label === tree.latestInserted,
    x,
    y: depth * 120 + 80
  }

  nodes.push(currentNode)

  // LEFT CHILD
  if (node.left) {

    edges.push({
      x1: x,
      y1: currentNode.y,
      x2: x - gap,
      y2: (depth + 1) * 120 + 80
    })

    calculatePositions(
      node.left,
      depth + 1,
      x - gap,
      gap / 1.8,
      nodes,
      edges
    )
  }

  // RIGHT CHILD
  if (node.right) {

    edges.push({
      x1: x,
      y1: currentNode.y,
      x2: x + gap,
      y2: (depth + 1) * 120 + 80
    })

    calculatePositions(
      node.right,
      depth + 1,
      x + gap,
      gap / 1.8,
      nodes,
      edges
    )
  }

  return { nodes, edges }
}

export default function TreeVisualizer() {

  const [treeData, setTreeData] = useState({
    nodes: [],
    edges: []
  })

  const viewportRef = useRef(null)

  useEffect(() => {

    const interval = setInterval(() => {

      if (!tree.root) return

      const layout = calculatePositions(tree.root)

      setTreeData(layout)

      // CENTER ON NEWEST NODE
      setTimeout(() => {

        const latestNode =
          layout.nodes.find(
            n => n.label === tree.latestInserted
          )

        if (latestNode && viewportRef.current) {

          const container = viewportRef.current

          container.scrollTo({
            left: latestNode.x - container.clientWidth / 2,
            top: latestNode.y - container.clientHeight / 2,
            behavior: "smooth"
          })
        }

      }, 100)

    }, 2000)

    return () => clearInterval(interval)

  }, [])

  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-blue-500 h-[500px]">

      <h2 className="text-2xl text-blue-400 mb-4">
        Live Red-Black Tree
      </h2>

      <div
        ref={viewportRef}
        className="relative h-[420px] overflow-auto bg-[#050816] rounded-xl"
      >

        <div className="relative w-[1200px] h-[1000px]">

          {/* BRANCH LINES */}
          <svg className="absolute top-0 left-0 w-full h-full">

            {treeData.edges.map((edge, index) => (

              <line
                key={index}
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                stroke="#64748b"
                strokeWidth="2"
              />

            ))}

          </svg>

          {/* NODES */}
          {treeData.nodes.map((node, index) => (

            <div
              key={index}

              className={`
                absolute
                w-14 h-14
                rounded-full
                flex items-center justify-center
                text-white font-bold
                border-4
                shadow-lg
                cursor-pointer
                transition-all duration-700
                hover:scale-110
                group

                ${node.isLatest
                  ? "animate-pulse scale-125 ring-4 ring-cyan-400"
                  : ""}

                ${node.color === "RED"
                  ? "bg-red-900 border-red-500"
                  : "bg-black border-green-500"}
              `}

              style={{
                left: node.x - 28,
                top: node.y - 28
              }}
            >

              {node.label}

              {/* TOOLTIP */}
              <div className="absolute hidden group-hover:block top-20 left-1/2 -translate-x-1/2 bg-black border border-cyan-400 p-3 rounded-lg text-xs w-72 z-50">

                <p>
                  <span className="text-cyan-400">
                    Source:
                  </span>
                  {" "}
                  {node.data.sourceIP}
                </p>

                <p>
                  <span className="text-cyan-400">
                    Destination:
                  </span>
                  {" "}
                  {node.data.destinationIP}
                </p>

                <p>
                  <span className="text-cyan-400">
                    Protocol:
                  </span>
                  {" "}
                  {node.data.protocol}
                </p>

                <p>
                  <span className="text-cyan-400">
                    Packets:
                  </span>
                  {" "}
                  {node.data.packetCount}
                </p>

                <p>
                  <span className="text-cyan-400">
                    Timestamp:
                  </span>
                  {" "}
                  {node.data.timestamp}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}
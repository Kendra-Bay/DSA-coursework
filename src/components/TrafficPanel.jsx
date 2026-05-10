import { useEffect, useState } from "react"
import { generatePacket } from "../data/packetGenerator"
import { tree } from "../store/treeStore"


export default function TrafficPanel() {

  const [traffic, setTraffic] = useState([])
  const [flowCount, setFlowCount] = useState(0)

  useEffect(() => {

    const interval = setInterval(() => {

      const packet = generatePacket()

      const flowKey =
        `${packet.sourceIP}-${packet.destinationIP}-${packet.protocol}`

      const existingFlow = tree.search(flowKey)

      if (existingFlow) {

        existingFlow.data.packetCount += packet.packetCount

      } else {

        tree.insert(flowKey, {
          ...packet
        })

      }

      const flows = tree.inorder()

      setFlowCount(flows.length)

      setTraffic([
        `FLOW: ${flowKey}`,
        ...flows.slice(0, 8).map(flow =>
          `${flow.key} | ${flow.color}`
        )
      ])

    }, 3000)

    return () => clearInterval(interval)

  }, [])

  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-green-500 h-[500px] overflow-auto">

      <h2 className="text-2xl text-green-400 mb-4">
        Live Traffic Flows
      </h2>

      <p className="mb-4 text-green-300">
        Active Flows: {flowCount}
      </p>

      <div className="space-y-3">

        {traffic.map((item, index) => (
          <div
            key={index}
            className="bg-black p-3 rounded-lg text-sm"
          >
            {item}
          </div>
        ))}

      </div>

    </div>
  )
}
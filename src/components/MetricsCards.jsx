import { useEffect, useState } from "react"

export default function MetricsCards() {

  const [metrics, setMetrics] = useState({
    flows: 1200,
    threats: 12,
    packets: 8000,
    height: 10,
  })

  useEffect(() => {

    const interval = setInterval(() => {

      setMetrics({
        flows: Math.floor(Math.random() * 5000),
        threats: Math.floor(Math.random() * 50),
        packets: Math.floor(Math.random() * 10000),
        height: Math.floor(Math.random() * 20),
      })

    }, 2000)

    return () => clearInterval(interval)

  }, [])

  const cards = [
    { title: "Active Flows", value: metrics.flows },
    { title: "Threats Detected", value: metrics.threats },
    { title: "Packets/sec", value: metrics.packets },
    { title: "Tree Height", value: metrics.height },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">

      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-gray-900 border border-green-500 rounded-xl p-4"
        >
          <h2 className="text-gray-400 text-sm">
            {card.title}
          </h2>

          <p className="text-3xl font-bold text-green-400 mt-2">
            {card.value}
          </p>
        </div>
      ))}

    </div>
  )
}